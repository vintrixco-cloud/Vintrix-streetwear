import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "NAME MUST BE AT LEAST 2 CHARACTERS"),
  email: z.string().email("INVALID EMAIL ADDRESS"),
  subject: z.string().min(5, "SUBJECT IS REQUIRED"),
  message: z.string().min(10, "MESSAGE MUST BE AT LEAST 10 CHARACTERS"),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("MESSAGE SENT. WE WILL GET BACK TO YOU SHORTLY.", {
      style: {
        borderRadius: "0px",
        background: "#fff",
        color: "#000",
        border: "none",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        textTransform: "uppercase"
      }
    });
    form.reset();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2">
      <div className="p-12 md:p-24 bg-card border-r border-b lg:border-b-0 border-border flex flex-col justify-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-bebas text-8xl md:text-[10vw] leading-[0.8] tracking-tighter mb-12">
            REACH<br/>OUT
          </h1>
          
          <div className="flex flex-col gap-8 font-space text-sm tracking-widest text-muted-foreground">
            <div>
              <p className="text-white mb-2">EMAIL</p>
              <a href="mailto:hello@vintrix.qa" className="hover:text-white transition-colors">HELLO@VINTRIX.QA</a>
            </div>
            <div>
              <p className="text-white mb-2">LOCATION</p>
              <p>DOHA, QATAR<br/>SHIPPING WORLDWIDE</p>
            </div>
            <div>
              <p className="text-white mb-2">SOCIAL</p>
              <a href="#" className="hover:text-white transition-colors block">INSTAGRAM</a>
              <a href="#" className="hover:text-white transition-colors block mt-2">TWITTER / X</a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-12 md:p-24 flex items-center">
        <motion.form 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={form.handleSubmit(onSubmit)} 
          className="w-full max-w-xl mx-auto flex flex-col gap-8 font-space"
        >
          <div>
            <label className="block text-sm tracking-widest mb-4">NAME</label>
            <input 
              {...form.register("name")}
              className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-white transition-colors placeholder:text-muted-foreground"
              placeholder="ENTER YOUR NAME"
            />
            {form.formState.errors.name && (
              <p className="text-destructive text-xs mt-2 tracking-widest">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm tracking-widest mb-4">EMAIL</label>
            <input 
              {...form.register("email")}
              className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-white transition-colors placeholder:text-muted-foreground"
              placeholder="ENTER YOUR EMAIL"
            />
            {form.formState.errors.email && (
              <p className="text-destructive text-xs mt-2 tracking-widest">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm tracking-widest mb-4">SUBJECT</label>
            <input 
              {...form.register("subject")}
              className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-white transition-colors placeholder:text-muted-foreground"
              placeholder="ENTER SUBJECT"
            />
            {form.formState.errors.subject && (
              <p className="text-destructive text-xs mt-2 tracking-widest">{form.formState.errors.subject.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm tracking-widest mb-4">MESSAGE</label>
            <textarea 
              {...form.register("message")}
              rows={4}
              className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-white transition-colors placeholder:text-muted-foreground resize-none"
              placeholder="ENTER YOUR MESSAGE"
            />
            {form.formState.errors.message && (
              <p className="text-destructive text-xs mt-2 tracking-widest">{form.formState.errors.message.message}</p>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-white text-black font-bebas text-3xl tracking-widest py-6 mt-8 hover:bg-black hover:text-white border border-white transition-colors"
          >
            SEND MESSAGE
          </button>
        </motion.form>
      </div>
    </div>
  );
}
