"use client";
import { useState } from "react";

const PopUpImageUpload = ({ 
  title, 
  onClose, 
  onUploadComplete, 
  imageRequirements 
}) => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack] = useState(null);
  const [errors, setErrors] = useState({});

  // Helper function to parse file size from requirement string (e.g., "5 MB" -> 5242880 bytes)
  const parseMaxSize = (sizeString) => {
    if (!sizeString) return null;
    const match = sizeString.match(/(\d+(?:\.\d+)?)\s*(KB|MB|GB)/i);
    if (!match) return null;
    
    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    
    switch (unit) {
      case 'KB': return value * 1024;
      case 'MB': return value * 1024 * 1024;
      case 'GB': return value * 1024 * 1024 * 1024;
      default: return null;
    }
  };

  // Helper function to parse dimensions (e.g., "1200x800" -> {width: 1200, height: 800})
  const parseDimensions = (dimensionString) => {
    if (!dimensionString) return null;
    const match = dimensionString.match(/(\d+)\s*x\s*(\d+)/i);
    if (!match) return null;
    return { width: parseInt(match[1]), height: parseInt(match[2]) };
  };

  // Helper function to get image dimensions
  const getImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => resolve(null);
      img.src = URL.createObjectURL(file);
    });
  };

  // Validation function
  const validateFile = async (file, type) => {
    const fileErrors = [];
    
    if (!imageRequirements) {
      return fileErrors;
    }

    // Format validation
    if (imageRequirements.format) {
      const allowedFormats = imageRequirements.format.toLowerCase().split(',').map(f => f.trim());
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const mimeType = file.type.toLowerCase();
      
      const isValidFormat = allowedFormats.some(format => {
        const cleanFormat = format.replace(/[^a-z]/g, '');
        return fileExtension === cleanFormat || 
               mimeType.includes(cleanFormat) ||
               (cleanFormat === 'jpg' && (fileExtension === 'jpeg' || mimeType.includes('jpeg')));
      });
      
      if (!isValidFormat) {
        fileErrors.push(`File format must be: ${imageRequirements.format}`);
      }
    }

    // File size validation
    if (imageRequirements.maxSize) {
      const maxSizeBytes = parseMaxSize(imageRequirements.maxSize);
      if (maxSizeBytes && file.size > maxSizeBytes) {
        fileErrors.push(`File size must not exceed ${imageRequirements.maxSize}`);
      }
    }

    // Image dimensions validation
    if (imageRequirements.dimensions && file.type.startsWith('image/')) {
      const requiredDimensions = parseDimensions(imageRequirements.dimensions);
      if (requiredDimensions) {
        const actualDimensions = await getImageDimensions(file);
        if (actualDimensions && 
            (actualDimensions.width < requiredDimensions.width || 
             actualDimensions.height < requiredDimensions.height)) {
          fileErrors.push(`Image dimensions must be at least ${imageRequirements.dimensions} pixels`);
        }
      }
    }

    return fileErrors;
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear previous errors for this field
    setErrors(prev => ({
      ...prev,
      [type]: []
    }));

    // Validate the file
    const validationErrors = await validateFile(file, type);
    
    if (validationErrors.length > 0) {
      setErrors(prev => ({
        ...prev,
        [type]: validationErrors
      }));
      return;
    }

    // If validation passes, process the file
    if (type === 'front') {
      setFrontImage(file);
      // Only show preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewFront(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewFront(null);
      }
    } else {
      setBackImage(file);
      // Only show preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewBack(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewBack(null);
      }
    }
  };

  const handleSubmit = () => {
    // Check if there are any validation errors
    const hasErrors = Object.values(errors).some(errorArray => errorArray.length > 0);
    if (hasErrors) {
      return;
    }

    onUploadComplete({ licenseFront: frontImage, licenseBack: backImage });
    onClose();
  };

  const hasValidationErrors = Object.values(errors).some(errorArray => errorArray.length > 0);
  const isSubmitDisabled = !frontImage || !backImage || hasValidationErrors;

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`bg-white p-6 rounded-lg w-full ${imageRequirements ? 'max-w-lg' : 'max-w-md'} max-h-[90vh] overflow-y-auto`}>
        <h2 className="text-xl text-primary font-bold mb-4">{title}</h2>
        
        {/* Info Box with Image Requirements - Only show if imageRequirements prop is provided */}
        {imageRequirements && (
          <div className="border border-primary rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-black mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-black">
                  Image Upload Requirements
                </h3>
                <div className="mt-2 text-sm text-greyfortext">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {imageRequirements.format && <div><strong>Format:</strong> {imageRequirements.format}</div>}
                    {imageRequirements.maxSize && <div><strong>Max Size:</strong> {imageRequirements.maxSize}</div>}
                    {imageRequirements.resolution && <div><strong>Resolution:</strong> {imageRequirements.resolution}</div>}
                    {imageRequirements.dimensions && <div><strong>Dimensions:</strong> {imageRequirements.dimensions}</div>}
                    {imageRequirements.quality && <div><strong>Quality:</strong> {imageRequirements.quality}</div>}
                    {imageRequirements.lighting && <div><strong>Lighting:</strong> {imageRequirements.lighting}</div>}
                    {imageRequirements.angle && <div><strong>Angle:</strong> {imageRequirements.angle}</div>}
                    {imageRequirements.background && <div><strong>Background:</strong> {imageRequirements.background}</div>}
                    {imageRequirements.other && <div>{imageRequirements.other}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* Front Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Front Side</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleImageChange(e, 'front')}
              className={`block w-full text-sm text-greyfortext file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-mildorange file:text-primary hover:file:bg-footerorange ${
                errors.front?.length > 0 ? 'border-2 border-red-500' : ''
              }`}
            />
            
            {/* Front Image Errors */}
            {errors.front && errors.front.length > 0 && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                {errors.front.map((error, index) => (
                  <div key={index} className="text-sm text-red-600 flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                ))}
              </div>
            )}
            
            {/* Front Image Preview or File Info */}
            {frontImage && (
              <div className="mt-2">
                {previewFront ? (
                  <img
                    src={previewFront}
                    alt="License Front Preview"
                    className="h-32 object-contain border rounded"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 border rounded flex items-center">
                    <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{frontImage.name}</div>
                      <div className="text-xs text-gray-500">{(frontImage.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Back Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Back Side</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleImageChange(e, 'back')}
              className={`block w-full text-sm text-greyfortext file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-mildorange file:text-primary hover:file:bg-footerorange ${
                errors.back?.length > 0 ? 'border-2 border-red-500' : ''
              }`}
            />
            
            {/* Back Image Errors */}
            {errors.back && errors.back.length > 0 && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                {errors.back.map((error, index) => (
                  <div key={index} className="text-sm text-red-600 flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                ))}
              </div>
            )}
            
            {/* Back Image Preview or File Info */}
            {backImage && (
              <div className="mt-2">
                {previewBack ? (
                  <img
                    src={previewBack}
                    alt="License Back Preview"
                    className="h-32 object-contain border rounded"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 border rounded flex items-center">
                    <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{backImage.name}</div>
                      <div className="text-xs text-gray-500">{(backImage.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-red-500 bg-red-200 rounded hover:bg-red-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`px-4 py-2 text-sm font-medium text-white rounded ${
              isSubmitDisabled
                ? 'bg-mildorange cursor-not-allowed'
                : 'bg-primary hover:bg-footerorange'
            }`}
            title={hasValidationErrors ? 'Please fix validation errors before uploading' : ''}
          >
            Upload License
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpImageUpload;