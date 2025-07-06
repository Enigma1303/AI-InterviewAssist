import  CustomBreadCrumb  from "./customBreadcrumb"
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm,FormProvider } from "react-hook-form";
import {z} from "zod"
import { useEffect ,useState} from "react";
import { data, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Trash2 } from "lucide-react";
import Headings from "./headings";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "./ui/form";
  import { Input } from "./ui/input";
  import { Textarea } from "./ui/textarea";
import { LoaderPage } from "@/Pages/Loader";
import { chatSession } from "@/scripts";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { toast } from "sonner";
const formSchema=z.object({
    position:z
    .string()
    .min(1,"Necessary to fill")
    .max(50,"This should be 50 or less"),
    description:z
    .string()
    .min(10,"Description is Required")
    .max(200,"Description cannot exceed 200 letters"),
    experience:z
    .coerce
    .number()
    .min(0,"Experience cannot be empty or negative"),
    techStack:z
    .string()
    .min(4,"Tach stack must be atleast 4 characters"),
    
}) ;
export const FormMockInterview = ({ initialData }) => {
    
    const form=useForm({
        resolver:zodResolver(formSchema),
        defaultValues:initialData||{},
    });
    const { isValid, isSubmitting } = form.formState;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { userId } = useAuth();

    const title=initialData?.position?initialData?.position:"Generate a new AI practice interview";

    const breadCrumbPage=initialData?.position?initialData?.position:"Create";
    const actions=initialData?"Save Changes":"Create";
    const toastMessage= initialData
?{title:"Updated Your interview", description:"Changes Saved Succesfully"}
:{title:"Created", description:"New interview created Succesfully"}



const cleanAiResponse = (responseText) => {
    let cleanText = responseText.trim().replace(/(json|```|`)/g, "");
    const jsonArrayMatch = cleanText.match(/\[.*\]/s);
    if (!jsonArrayMatch) throw new Error("No JSON array found in response");
    try {
      return JSON.parse(jsonArrayMatch[0]);
    } catch (error) {
      throw new Error("Invalid JSON format: " + error.message);
    }
  };
  
  const generateAiResponse = async (data) => {
    const prompt = `
        As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

        [
          { "question": "<Question text>", "answer": "<Answer text>" },
          ...
        ]

        Job Information:
        - Job Position: ${data?.position}
        - Job Description: ${data?.description}
        - Years of Experience Required: ${data?.experience}
        - Tech Stacks: ${data?.techStack}

        The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
        `;
    
    const aiResult = await chatSession.sendMessage(prompt);
    console.log(aiResult.response.text());
    return cleanAiResponse(aiResult.response.text());
  };
  
const onSubmit =async()=>
{
    try {
        setLoading(true);
         console.log(form.getValues())
         if(initialData)
         {
            if(isValid)
            {
                const aiResult=await generateAiResponse(data);
                await updateDoc(doc(db,"interviews",initialData?.id),{
                    questions:aiResult,
                    ...data,
                    updatedAt:serverTimestamp()
                })
                toast(toastMessage.title,{description:toastMessage.description});
            }
         }
         else
         {
            //new
            if(isValid)
            {
               const aiResult=await generateAiResponse(data)
               const formdata=form.getValues();
             await addDoc(collection(db,"interviews"),
            {
                ...formdata,
                userId,
                questions:aiResult,
                createdAt:serverTimestamp(),

            });
           toast(toastMessage.title,{description:toastMessage.description});

            }
         }
         navigate("/generate",{replace:true});
    } catch (error) {
        console.log(error);
        toast.error("Error..",{
            description:"Something went wrong. Please try again later",
        })
    }finally{
        setLoading(false);
    }
}
    useEffect(() => {
        if (initialData) {
          form.reset({
            position: initialData.position,
            description: initialData.description,
            experience: initialData.experience,
            techStack: initialData.techStack,
          });
        }
      }, [initialData, form]);
    
    return (
    <div className="w-full flex-col space-y-4">
      <CustomBreadCrumb
        breadCrumbPage={breadCrumbPage}
        breadCrumbItems={[{ label: "Mock Interviews", link: "/generate" }]}

      />
      <div className="mt-4 w-full flex items-center justify-between">
        <Headings title={title} isSubHeading/>
        {
            !initialData && (
                <Button variant={'ghost'}>
                    <Trash2 className="min-w-4 min-h-4 text-red-700"/>
                </Button>
            )
        }
      </div>

      <Separator/>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-8 rounded-lg flex-col flex items-start justify-start gap-6 shadow-md "
        >
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Role / Job Position</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- Full Stack Developer"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Description</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- describle your job role"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Years of Experience</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- 5 Years"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Tech Stacks</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- React, Typescript..."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-end gap-6">
            <Button
              type="reset"
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitting || loading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size={"sm"}
              disabled={isSubmitting || !isValid || loading}
            >
              {loading ? (
                <LoaderPage className="text-gray-50 animate-spin" />
              ) : (
                actions
              )}
            </Button>
          </div>
        </form>
      </FormProvider>

    </div>
  );
};