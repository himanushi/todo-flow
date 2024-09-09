import { Panel } from "@xyflow/react";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Popover } from "./Popover";

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const storedApiKey = localStorage.getItem("openai-api-key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  return (
    <Panel position="top-right" onClick={() => setOpen(true)}>
      <Popover
        open={open}
        setOpen={setOpen}
        popupContent={
          <div className="flex flex-col gap-1 rounded-lg border-2 border-gray-800 bg-white p-3">
            <p>OpenAI API Key</p>
            <input
              type="password"
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                localStorage.setItem("openai-api-key", e.target.value);
              }}
              className="w-full rounded-lg border-2 border-gray-800 px-3 py-2"
            />
          </div>
        }
        targetContent={
          <Icon
            name="settings"
            className="cursor-pointer select-none text-4xl text-gray-600 focus:outline-none"
          />
        }
      />
    </Panel>
  );
};
