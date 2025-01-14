import { Layout } from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Rocket, Image, Twitter, Globe, Link } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, "Token name must be at least 3 characters"),
  symbol: z.string().min(2, "Token symbol must be at least 2 characters").max(6),
  description: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  telegram: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  image: z.any().optional(),
});

const CreateToken = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      description: "",
      website: "",
      twitter: "",
      telegram: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ ...values, initialSupply: "1000000000" });
    toast.success("Token creation initiated!");
  };

  return (
    <Layout>
      <div className="container max-w-2xl mx-auto py-8">
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="h-6 w-6 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold">Create Your Meme Token</h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Stack Meme Token" {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a memorable name for your token
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. SMT" {...field} />
                    </FormControl>
                    <FormDescription>
                      A short identifier for your token (2-6 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <span className="font-semibold">Initial Supply:</span>
                  <span>1,000,000,000 tokens</span>
                </div>
                <p className="text-sm text-gray-400">
                  Fixed supply for all meme tokens
                </p>
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                        <Image className="h-5 w-5 text-primary" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload a fun image for your token (max 2MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input placeholder="https://your-website.com" {...field} />
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter URL</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input placeholder="https://twitter.com/yourtoken" {...field} />
                        <Twitter className="h-5 w-5 text-primary" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telegram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram URL</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input placeholder="https://t.me/yourtoken" {...field} />
                        <Link className="h-5 w-5 text-primary" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full button-glow">
                <Rocket className="mr-2 h-4 w-4" />
                Launch Token
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateToken;