import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

type Props = { error: string | null };

function DisplayError({ error }: Props) {
  const { toast } = useToast();

  useEffect(() => {
    if (error === "") return;
    toast({
      title: "An error occurred",
      description: error,
      variant: "destructive",
    });
  }, [error, toast]);

  return <></>;
}

export default DisplayError;
