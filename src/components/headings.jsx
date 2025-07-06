
import { cn } from '@/lib/utils'
export default function Headings({title,description,isSubheading=false}) {
  return (
    <div>
      <h2 className={cn("text-2xl md:text-3xl  text-blue-500 font-semibold font-sans", isSubheading && "text-lg md:text-xl")}>
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground">
           {description}
        </p>
      )}
    </div>
  )
}
