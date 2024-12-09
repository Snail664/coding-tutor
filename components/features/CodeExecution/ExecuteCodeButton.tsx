import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { useState } from "react";
import { Play } from "lucide-react";
import { RunnerFactory } from "@/lib/runners";
import { useAppSelector, useAppDispatch } from "@/store";
import { setCodeExecuteResponse } from "@/slices/CodeSlice";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function ExecuteCodeButton() {
  const {
    question: { question },
    code: { sourceCode, programmingLanguage },
  } = useAppSelector((state) => state);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useUser();

  const runCode = async () => {
    if (!user) return alert("Please login to run code");
    if (loading) return;
    setLoading(true);
    const runner = RunnerFactory.getRunner(programmingLanguage.name);
    const completeCode = runner.prepareCode(sourceCode, question.testCases);
    const result = await runner.runCode(completeCode);
    console.log("coming result: ", result);
    dispatch(setCodeExecuteResponse(result));
    setLoading(false);
  };

  return (
    <Button onClick={runCode}>
      {!loading && <Play fill="white" className="mr-2 h-4 w-4" />}
      {loading && <Loading />}
      Run
    </Button>
  );
}
