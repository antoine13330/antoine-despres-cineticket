import React, { useState } from "react";
import Barcode from "react-barcode";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScanBarcodeIcon } from "lucide-react";

type BarcodeGeneratorProps = {
  onUpload?: (base64: string, format : string) => void;
};

export default function BarcodeGenerator({ onUpload }: BarcodeGeneratorProps) {
  const [text, setText] = useState("");

  const generateBarcode = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    const barcodeElement = document.getElementById("barcode");
    if (!barcodeElement) return;

    const svg = barcodeElement.querySelector("svg");
    if (!svg) return;

    const xml = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(xml);
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      const base64Image = canvas.toDataURL("image/png");
      if (onUpload) onUpload(base64Image, "image/png");
    };
  };

  return (
    <>
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Enter text for barcode"
        value={text}
        onKeyDown={(e) => {
            if (e.key === "Enter") generateBarcode();
            }
        }
        onChange={(e) => setText(e.target.value)}
      />
     
      <Button onClick={generateBarcode} disabled={!text}><ScanBarcodeIcon/></Button>
    </div>
     <div id="barcode" className="opacity-0 h-0 w-0">
     {text && <Barcode value={text} />}
   </div>
    </>
    
  );
}
