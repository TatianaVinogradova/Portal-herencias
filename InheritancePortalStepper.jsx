import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  PenTool, 
  CheckCircle, 
  Circle, 
  Clock,
  ChevronRight,
  Upload,
  Gavel
} from 'lucide-react';

const InheritancePortalStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      id: 0,
      title: 'Subir Documentos',
      description: 'Cargar documentación requerida',
      icon: Upload,
      requiredDocs: ['Certificado de defunción', 'Testamento', 'DNI herederos']
    },
    {
      id: 1,
      title: 'Revisión Legal',
      description: 'Verificación por equipo jurídico',
      icon: Gavel,
      estimatedTime: '3-5 días hábiles'
    },
    {
      id: 2,
      title: 'Valoración',
      description: 'Tasación de bienes y activos',
      icon: Search,
      estimatedTime: '1-2 semanas'
    },
    {
      id: 3,
      title: 'Documentación',
      description: 'Preparación de documentos finales',
      icon: FileText,
      estimatedTime: '2-3 días hábiles'
    },
    {
      id: 4,
      title: 'Firma',
      description: 'Firma de documentos oficiales',
      icon: PenTool,
      location: 'Notaría o digital'
    },
    {
      id: 5,
      title: 'Finalización',
      description: 'Proceso completado',
      icon: CheckCircle,
      finalStep: true
    }
  ];

  const getStepStatus = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) return 'completed';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep || completedSteps.includes(stepIndex - 1) || stepIndex === 0) return 'available';
    return 'pending';
  };

  const getStepColors = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white border-green-500';
      case 'current':
        return 'bg-blue-500 text-white border-blue-500 ring-4 ring-blue-200';
      case 'available':
        return 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer';
      default:
        return 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed';
    }
  };

  const getConnectorColor = (stepIndex) => {
    if (completedSteps.includes(stepIndex) && completedSteps.includes(stepIndex + 1)) {
      return 'bg-green-500';
    }
    if (completedSteps.includes(stepIndex) || stepIndex < currentStep) {
      return 'bg-blue-500';
    }
    return 'bg-gray-200';
  };

  const handleStepClick = (stepIndex) => {
    const status = getStepStatus(stepIndex);
    if (status === 'available' || status === 'current' || status === 'completed') {
      setCurrentStep(stepIndex);
    }
  };

  const completeCurrentStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetProcess = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Portal de Gestión de Herencias
        </h1>
        <p className="text-gray-600">
          Sigue el progreso de tu proceso de herencia paso a paso
        </p>
      </div>

      {/* Stepper horizontal */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex items-start justify-between min-w-full px-4" style={{ minWidth: '800px' }}>
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="flex flex-col items-center relative flex-1">
                {/* Paso */}
                <div
                  onClick={() => handleStepClick(index)}
                  className={`
                    relative flex items-center justify-center w-16 h-16 rounded-full border-2 
                    transition-all duration-300 ${getStepColors(status)} mb-3
                  `}
                >
                  {status === 'completed' ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : status === 'current' ? (
                    <Clock className="w-8 h-8" />
                  ) : (
                    <Icon className="w-8 h-8" />
                  )}
                  
                  {/* Número del paso */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Título del paso */}
                <div className="text-center max-w-24">
                  <p className={`text-xs font-medium leading-tight ${
                    status === 'current' ? 'text-blue-600' : 
                    status === 'completed' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </p>
                </div>

                {/* Conector */}
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-full w-full h-0.5 -translate-x-1/2" style={{ width: 'calc(100% - 32px)', left: 'calc(50% + 32px)' }}>
                    <div className={`h-full transition-all duration-500 ${getConnectorColor(index)}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Información del paso actual */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <StepIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">{currentStepData.description}</p>
          </div>
        </div>

        {/* Información específica del paso */}
        <div className="bg-white rounded-lg p-4 mb-4">
          {currentStepData.requiredDocs && (
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Documentos requeridos:</h3>
              <ul className="space-y-1">
                {currentStepData.requiredDocs.map((doc, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Circle className="w-2 h-2 mr-2 fill-current" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {currentStepData.estimatedTime && (
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Tiempo estimado:</h3>
              <p className="text-gray-600">{currentStepData.estimatedTime}</p>
            </div>
          )}
          
          {currentStepData.location && (
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Ubicación:</h3>
              <p className="text-gray-600">{currentStepData.location}</p>
            </div>
          )}
          
          {currentStepData.finalStep && (
            <div className="text-center">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block">
                🎉 ¡Proceso de herencia completado exitosamente!
              </div>
            </div>
          )}
        </div>

        {/* Acciones */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Paso {currentStep + 1} de {steps.length}
          </div>
          
          <div className="flex space-x-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Anterior
              </button>
            )}
            
            {!completedSteps.includes(currentStep) && currentStep < steps.length - 1 && (
              <button
                onClick={completeCurrentStep}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                Completar paso
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            )}
            
            {currentStep === steps.length - 1 && completedSteps.includes(currentStep) && (
              <button
                onClick={resetProcess}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Nuevo proceso
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progreso general */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progreso general</span>
          <span className="text-sm text-gray-600">
            {completedSteps.length} de {steps.length} pasos completados
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default InheritancePortalStepper;