import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { TooltipButton } from "./tooltipButton";
import { Eye, Newspaper, Sparkles } from "lucide-react";

function InterviewBadge({ interview, onMockPage = false }) {
    const navigate = useNavigate();
    const { userId } = useAuth();

    return (
        <Card className="p-4 shadow-gray-200 md:rounded-sm hover:shadow-md cursor-pointer transition-all">
            <CardTitle className="text-lg">
                {interview?.position}
            </CardTitle>
            <CardDescription>
                {interview?.description}
            </CardDescription>
            <div className="w-full flex items-center gap-2 flex-wrap space-y-3">
                {interview?.techStack?.split(",").map((word, index) => (
                    <Badge
                        key={index}
                        variant="outline"
                        className="text-xs text-muted-foreground hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900"
                    >
                        {word}
                    </Badge>
                ))}
            </div>
            <CardFooter className={`w-full flex items-center p-0 ${onMockPage ? "justify-end" : "justify-between"}`}>
                <p className="text-[12px] text-muted-foreground truncate whitespace-nowrap">
                    {interview?.createdAt?.toDate &&
                        `${new Date(interview.createdAt.toDate()).toLocaleDateString("en-US", { dateStyle: "long" })} - ${new Date(interview.createdAt.toDate()).toLocaleTimeString("en-US", { timeStyle: "short" })}`}
                </p>
                {!onMockPage && (
                    <div className="flex items-center justify-center">
                        <TooltipButton
                            content="View"
                            buttonVariant="ghost"
                            onClick={() => navigate(`/generate/${interview?.id}`, { replace: true })}
                            disabled={false}
                            buttonClassName="hover:text-sky-500"
                            icon={<Eye />}
                            loading={false}
                        />
                        <TooltipButton
                            content="Feedback"
                            buttonVariant="ghost"
                            onClick={() => navigate(`/generate/feedback/${interview?.id}`, { replace: true })}
                            disabled={false}
                            buttonClassName="hover:text-yellow-500"
                            icon={<Newspaper />}
                            loading={false}
                        />
                        <TooltipButton
                            content="Start"
                            buttonVariant="ghost"
                            onClick={() => navigate(`/generate/interview/${interview?.id}`, { replace: true })}
                            disabled={false}
                            buttonClassName="hover:text-sky-500"
                            icon={<Sparkles />}
                            loading={false}
                        />
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}

export default InterviewBadge;
