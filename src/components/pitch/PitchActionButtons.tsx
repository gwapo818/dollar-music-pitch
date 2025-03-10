import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy, Download } from "lucide-react";

type PitchActionButtonsProps = {
  onRegenerate: () => void;
  onCopy: () => void;
  onExport: () => void;
  isPolishing: boolean;
  hasEnhanced: boolean;
};

const PitchActionButtons = ({
  onRegenerate,
  onCopy,
  onExport,
  isPolishing,
  hasEnhanced,
}: PitchActionButtonsProps) => {
  const buttonClasses = "gap-2 bg-[#9b87f5]/10 border-[#9b87f5]/30 hover:bg-[#9b87f5]/20 hover:border-[#9b87f5]/40 text-[#D6BCFA]";

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {hasEnhanced && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            disabled={isPolishing}
            className={buttonClasses}
          >
            <RefreshCw className={`h-4 w-4 ${isPolishing ? 'animate-spin' : ''}`} />
            <span className="whitespace-nowrap">Regenerate</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onCopy}
            className={buttonClasses}
          >
            <Copy className="h-4 w-4" />
            <span className="whitespace-nowrap">Copy</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className={buttonClasses}
          >
            <Download className="h-4 w-4" />
            <span className="whitespace-nowrap">Export</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default PitchActionButtons;