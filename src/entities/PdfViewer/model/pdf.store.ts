import { create } from "zustand";
import { PdfState } from "./pdf.types";

export const usePdfStore = create<PdfState>((set) => ({
    pdfFile: '',
    setPdfFile: (f)=>{
        set({
            pdfFile: f
        })
    }
}))