import React, { useState, useRef, useCallback } from 'react';
import { SignatureData } from './types.ts';
import SignaturePreview from './components/SignaturePreview.tsx';
import ImageUploader from './components/ImageUploader.tsx';

type SignatureType = 'vpa_urbanismo' | 'grupo_vpa';

const App: React.FC = () => {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: 'Caio Sena',
    title: 'Marketing e Comunicação',
    phone: '(31) 2536-0167',
    mobile: '',
    photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Placeholder photo
  });
  const [copied, setCopied] = useState(false);
  const [signatureType, setSignatureType] = useState<SignatureType>('vpa_urbanismo');


  const signatureRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignatureData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (photo: string) => {
    setSignatureData(prev => ({ ...prev, photo }));
  };

  const copyHtmlToClipboard = useCallback(() => {
    if (signatureRef.current) {
      const htmlContent = signatureRef.current.innerHTML;
      try {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const clipboardItem = new ClipboardItem({ 'text/html': blob });
        navigator.clipboard.write([clipboardItem]).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
          console.error('Failed to copy HTML: ', err);
          alert('Não foi possível copiar o HTML. Por favor, tente novamente.');
        });
      } catch (error) {
        console.error('Error with Clipboard API:', error);
        alert('Seu navegador pode não suportar esta funcionalidade de cópia.');
      }
    }
  }, []);

  const handlePreviewHtml = useCallback(() => {
    if (signatureRef.current) {
      const htmlContent = signatureRef.current.innerHTML;
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write('<html><head><title>Pré-visualização da Assinatura</title></head><body>');
        newWindow.document.write(htmlContent);
        newWindow.document.write('</body></html>');
        newWindow.document.close();
      } else {
        alert('Não foi possível abrir a nova janela. Verifique se o seu navegador está bloqueando pop-ups.');
      }
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <header className="text-center mb-8">
            <img src="https://www.vpaurbanismo.com.br/assinatura/vpa_assinatura.png" alt="VPA Urbanismo Logo" className="w-[130px] h-[74px] object-contain mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#003366]">Gerador de Assinatura de E-mail</h1>
            <p className="text-gray-600 mt-2">Personalize sua assinatura preenchendo os campos e escolhendo um modelo.</p>
          </header>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#003366] border-b pb-2 mb-4 text-center">Escolha o modelo da assinatura</h2>
            <div className="flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
              {/* VPA Urbanismo Option */}
              <div
                role="button"
                tabIndex={0}
                aria-pressed={signatureType === 'vpa_urbanismo'}
                onClick={() => setSignatureType('vpa_urbanismo')}
                onKeyDown={(e) => e.key === 'Enter' && setSignatureType('vpa_urbanismo')}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${signatureType === 'vpa_urbanismo' ? 'border-blue-500 shadow-lg bg-blue-50' : 'border-gray-200 hover:border-blue-400'}`}
              >
                <img src="https://www.vpaurbanismo.com.br/assinatura/vpa_assinatura.png" alt="VPA Urbanismo" className="h-20 object-contain" />
              </div>
              {/* Grupo VPA Option */}
              <div
                role="button"
                tabIndex={0}
                aria-pressed={signatureType === 'grupo_vpa'}
                onClick={() => setSignatureType('grupo_vpa')}
                onKeyDown={(e) => e.key === 'Enter' && setSignatureType('grupo_vpa')}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${signatureType === 'grupo_vpa' ? 'border-blue-500 shadow-lg bg-blue-50' : 'border-gray-200 hover:border-blue-400'}`}
              >
                <img src="https://vpaurbanismo.com.br/assinatura/grupovpa_assinatura.png" alt="Grupo VPA" className="h-20 object-contain" />
              </div>
            </div>
          </div>

          <main className="grid grid-cols-1 gap-12">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#003366] border-b pb-2">Seus Dados</h2>
              <ImageUploader onPhotoUpload={handlePhotoUpload} currentPhoto={signatureData.photo} />
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={signatureData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  placeholder="Seu Nome"
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Cargo</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={signatureData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  placeholder="Seu Cargo"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={signatureData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  placeholder="(XX) XXXX-XXXX"
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Celular (opcional)</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={signatureData.mobile || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  placeholder="(XX) XXXXX-XXXX"
                />
              </div>
            </div>

            <div className="space-y-6">
               <h2 className="text-xl font-semibold text-[#003366] border-b pb-2">Pré-visualização</h2>
              <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 min-h-[150px] flex items-center justify-center">
                <SignaturePreview data={signatureData} signatureType={signatureType} />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={copyHtmlToClipboard}
                  className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-[#003366] hover:bg-[#002244]'}`}
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      HTML Copiado!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      Copiar HTML da Assinatura
                    </>
                  )}
                </button>
                <button
                  onClick={handlePreviewHtml}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  Visualizar em HTML
                </button>
              </div>
            </div>
          </main>
        </div>
        
        {/* Hidden div for generating HTML */}
        <div ref={signatureRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <SignaturePreview data={signatureData} isHtmlGeneration={true} signatureType={signatureType} />
        </div>
      </div>
    </div>
  );
};

export default App;
