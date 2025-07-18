import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
const DialogModel = ({
     title,
  description,
   isOpen,
  onClose,
  children
}) => {

     

    const onChange = (open) => {
    if (!open) {
      onClose();
    }
  };


  return (
    <div>
        <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default DialogModel
