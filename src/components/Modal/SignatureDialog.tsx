import { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useDynamicFontSize } from '@/hooks';
import { Eraser, X, Trash2 } from 'lucide-react';
import { Input, Button, RadioGroup, RadioGroupItem, Tabs, TabsList, TabsTrigger, TabsContent, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";

interface SignatureDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (signature: string) => void;
}

const colorOptions = [
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'Dark Blue', value: 'darkBlue', hex: '#00008B' },
    { name: 'Crimson Red', value: 'crimsonRed', hex: '#DC143C' },
];

/**
 * Component for adding a signature to an invoice. Allows the user to draw, type, or upload a signature.
 * @param isOpen Whether the dialog is open or not.
 * @param onClose Function to call when the dialog is closed.
 * @param onSave Function to call when the user saves the signature.
 */
export const SignatureDialog: React.FC<SignatureDialogProps> = ({ isOpen, onClose, onSave }) => {
    // Signature type. Can be either 'draw', 'type', or 'upload'.
    const [signatureType, setSignatureType] = useState<'draw' | 'type' | 'upload'>('draw');

    // Signature that the user has typed.
    const [typedSignature, setTypedSignature] = useState<string>('');

    // Font selected for typing signatures.
    const [selectedFont, setSelectedFont] = useState<string>('Dancing Script');

    // The uploaded signature, if any.
    const [uploadedSignature, setUploadedSignature] = useState<string | null>(null);

    // The color of the signature.
    const [signatureColor, setSignatureColor] = useState<string>(colorOptions[0].hex);

    // A reference to the SignatureCanvas component for drawing signatures.
    const signaturePadRef = useRef<SignatureCanvas | null>(null);

    // A reference to the container element that contains the signature pad.
    const containerRef = useRef<HTMLDivElement>(null);

    // A reference to the canvas element that contains the signature.
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // The dimensions of the container element.
    const [containerDimensions, setContainerDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

    // Dynamically calculate the font size based on the width of the container.
    const fontSize = useDynamicFontSize(typedSignature, containerDimensions.width, containerDimensions.height);

    /**
     * Handle the user changing the signature type.
     * @param value The new signature type.
     */
    const handleTabChange = (value: string) => {
        if (value === 'upload' || value === 'draw' || value === 'type') {
            setSignatureType(value);
        }
    };

    /**
     * Handle the user clearing the signature.
     */
    const handleClearSignature = () => {
        if (signatureType === 'draw' && signaturePadRef.current) {
            signaturePadRef.current.clear();
        }
        if (signatureType === 'type') {
            setTypedSignature('');
        }
        if (signatureType === 'upload') {
            setUploadedSignature(null);
        }
    };

    /**
     * Convert the typed signature to an image.
     * @returns The image data URL.
     */
    const convertTypedSignatureToImage = () => {
        if (canvasRef.current && containerRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                canvas.width = width;
                canvas.height = height;
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, width, height);
                ctx.font = `${fontSize}px ${selectedFont}`;
                ctx.fillStyle = signatureColor;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(typedSignature, width / 2, height / 2);
                return canvas.toDataURL('image/png');
            }
        }
        return null;
    };

    /**
     * Handle the user saving the signature.
     */
    const handleSave = () => {
        let finalSignature = '';
        if (signatureType === 'draw' && signaturePadRef.current) {
            finalSignature = signaturePadRef.current.getTrimmedCanvas().toDataURL('image/png');
        } else if (signatureType === 'type') {
            const convertedSignature = convertTypedSignatureToImage();
            if (convertedSignature) {
                finalSignature = convertedSignature;
            }
        } else if (signatureType === 'upload' && uploadedSignature) {
            finalSignature = uploadedSignature;
        }
        onSave(finalSignature);
        onClose();
    };

    /**
     * Handle the user uploading a signature.
     * @param e The event.
     */
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedSignature(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setContainerDimensions({ width, height });
        }
    }, [typedSignature]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='w-full bg-neutral-50'>
                <DialogHeader>
                    <DialogTitle>Add Signature</DialogTitle>
                </DialogHeader>
                <Tabs value={signatureType} onValueChange={handleTabChange}>
                    <TabsList className="w-full justify-between items-center">
                        <TabsTrigger value="draw" className='w-full'>Draw</TabsTrigger>
                        <TabsTrigger value="type" className='w-full'>Type</TabsTrigger>
                        <TabsTrigger value="upload" className='w-full'>Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="draw" className='relative w-full h-60'>
                        <SignatureCanvas
                            ref={signaturePadRef}
                            penColor={signatureColor}
                            canvasProps={{
                                className: 'w-full h-full border bg-white rounded'
                            }}
                        />
                    </TabsContent>
                    <TabsContent value="type" className='relative w-full h-60' ref={containerRef}>
                        <Input
                            type="text"
                            value={typedSignature}
                            onChange={(e) => setTypedSignature(e.target.value)}
                            style={{ fontFamily: selectedFont, fontSize: `${fontSize}px` }}
                            className="mb-2 h-full"
                            placeholder="Signature"
                        />
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </TabsContent>
                    <TabsContent value="upload" className='relative w-full h-60'>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="mb-2"
                        />
                        {uploadedSignature && (
                            <img src={uploadedSignature} alt="Uploaded Signature" className="mt-2 border border-neutral-400 rounded-lg w-full h-5/6 object-cover" />
                        )}
                    </TabsContent>
                </Tabs>
                <DialogFooter className="relative flex flex-col gap-2">
                    {
                        signatureType === 'draw' && (
                            <TooltipProvider>
                                <RadioGroup
                                    value={signatureColor}
                                    onValueChange={setSignatureColor}
                                    className="flex justify-between items-center space-x-2 mr-auto"
                                >
                                    {colorOptions.map((color, index) => (
                                        <Tooltip key={index}>
                                            <TooltipTrigger>
                                                <RadioGroupItem
                                                    value={color.hex}
                                                    id={color.value}
                                                    className="signature-color w-8 h-auto rounded-full border-2 border-gray-200 hover:border-gray-500 focus:border-gray-500 transition-all duration-200 ease-in-out relative"
                                                    style={{ backgroundColor: color.hex }}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {color.name}
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </RadioGroup>
                            </TooltipProvider>
                        )
                    }
                    {
                        signatureType === 'type' && (
                            <Select value={selectedFont} onValueChange={setSelectedFont}>
                                <SelectTrigger className='mr-8'>
                                    <SelectValue placeholder="Select a font" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Dancing Script">Dancing Script</SelectItem>
                                    <SelectItem value="Pacifico">Pacifico</SelectItem>
                                    <SelectItem value="Brush Script MT">Brush Script MT</SelectItem>
                                    <SelectItem value="Caveat">Caveat</SelectItem>
                                    <SelectItem value="Satisfy">Satisfy</SelectItem>
                                    <SelectItem value="Great Vibes">Great Vibes</SelectItem>
                                </SelectContent>
                            </Select>
                        )
                    }
                    <Button onClick={handleClearSignature} variant="outline">
                        {signatureType === 'draw' ? <Eraser className="mr-2 h-4 w-4" /> :
                            signatureType === 'type' ? <X className="mr-2 h-4 w-4" /> :
                                <Trash2 className="mr-2 h-4 w-4" />}
                        {signatureType === 'draw' ? 'Erase' : signatureType === 'type' ? 'Clear' : 'Remove'}
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};