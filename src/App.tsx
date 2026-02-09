
import React, { useState, useRef, useCallback } from 'react';
import { SignatureData } from './types.ts';
import SignaturePreview from './components/SignaturePreview.tsx';
import ImageUploader from './components/ImageUploader.tsx';

type SignatureType = 'vpa_urbanismo' | 'grupo_vpa';

const App: React.FC = () => {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: 'Carolina Lattanzio',
    title: 'Gente e Gestão',
    phone: '(31) 2118-4361',
    mobile: '',
    photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    photoUrl: '',
  });
  const [copied, setCopied] = useState(false);
  const [signatureType, setSignatureType] = useState<SignatureType>('grupo_vpa');

  const signatureRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignatureData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (photo: string) => {
    setSignatureData(prev => ({ ...prev, photo, photoUrl: '' }));
  };

  const handleUrlChange = (photoUrl: string) => {
    setSignatureData(prev => ({ ...prev, photoUrl }));
  };

  const copyHtmlToClipboard = useCallback(() => {
    if (signatureRef.current) {
      const htmlContent = signatureRef.current.innerHTML;
      const listener = (e: ClipboardEvent) => {
        e.clipboardData?.setData('text/html', htmlContent);
        e.clipboardData?.setData('text/plain', htmlContent);
        e.preventDefault();
      };
      document.addEventListener('copy', listener);
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy HTML: ', err);
      } finally {
        document.removeEventListener('copy', listener);
      }
    }
  }, []);

  const handlePreviewHtml = useCallback(() => {
    if (signatureRef.current) {
      const htmlContent = signatureRef.current.innerHTML;
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write('<html><head><title>Gerador 2.0 - Prévia</title></head><body style="padding: 20px; font-family: sans-serif;">' + htmlContent + '</body></html>');
        newWindow.document.close();
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F4F6] py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-8 md:p-12 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 bg-white">
          <div className="text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2">
               <h1 className="text-3xl font-black text-[#203864] tracking-tighter">
                 Gerador de Assinatura <span className="text-[#19a649]">2.0</span>
               </h1>
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Otimização Outlook & Mobile Ativada</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setSignatureType('vpa_urbanismo')}
              className={`px-4 py-2 rounded-2xl border-2 transition-all flex flex-col items-center justify-center h-16 w-36 ${signatureType === 'vpa_urbanismo' ? 'border-[#19a649] bg-green-50 shadow-lg scale-105' : 'border-gray-50 bg-white opacity-40 hover:opacity-100'}`}
            >
              <img src="https://www.vpaurbanismo.com.br/assinaturadeemail/vpa_assinatura.png" alt="Urbanismo" className="h-6 object-contain" />
              <span className="text-[8px] font-black mt-1 text-[#203864]">MODELO VPA</span>
            </button>
            <button 
              onClick={() => setSignatureType('grupo_vpa')}
              className={`px-4 py-2 rounded-2xl border-2 transition-all flex flex-col items-center justify-center h-16 w-36 ${signatureType === 'grupo_vpa' ? 'border-[#203864] bg-blue-50 shadow-lg scale-105' : 'border-gray-50 bg-white opacity-40 hover:opacity-100'}`}
            >
              <img src="https://vpaurbanismo.com.br/assinaturadeemail/grupovpa_assinatura.png" alt="Grupo VPA" className="h-6 object-contain" />
              <span className="text-[8px] font-black mt-1 text-[#203864]">MODELO GRUPO</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {/* Coluna de Inputs */}
          <div className="p-8 space-y-8 border-r border-gray-100">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#19a649] text-white flex items-center justify-center text-[10px]">1</span>
              Personalização
            </h2>
            
            <ImageUploader 
              onPhotoUpload={handlePhotoUpload} 
              onUrlChange={handleUrlChange}
              currentPhoto={signatureData.photo} 
              currentUrl={signatureData.photoUrl}
            />

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Nome Completo</label>
                <input type="text" name="name" value={signatureData.name} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#203864] focus:outline-none transition-all font-bold text-[#203864] text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Cargo / Função</label>
                <input type="text" name="title" value={signatureData.title} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#203864] focus:outline-none transition-all font-bold text-[#203864] text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Fixo</label>
                  <input type="text" name="phone" value={signatureData.phone} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#203864] focus:outline-none transition-all font-bold text-[#203864] text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Celular</label>
                  <input type="text" name="mobile" value={signatureData.mobile} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#203864] focus:outline-none transition-all font-bold text-[#203864] text-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna de Preview */}
          <div className="p-8 bg-gray-50/50 flex flex-col border-t md:border-t-0">
             <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-8">
              <span className="w-5 h-5 rounded-full bg-[#203864] text-white flex items-center justify-center text-[10px]">2</span>
              Pré-visualização
            </h2>
            
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-200 min-h-[220px] flex items-center justify-center overflow-x-auto">
               <SignaturePreview data={signatureData} signatureType={signatureType} />
            </div>

            <div className="mt-12 space-y-4">
              <button
                onClick={copyHtmlToClipboard}
                className={`w-full py-6 rounded-[1.5rem] font-black text-white transition-all shadow-xl hover:shadow-[#203864]/30 transform active:scale-95 flex items-center justify-center gap-4 text-sm tracking-widest ${copied ? 'bg-green-500' : 'bg-[#203864] hover:bg-[#1a2d52]'}`}
              >
                {copied ? '✓ COPIADO COM SUCESSO' : 'COPIAR ASSINATURA 2.0'}
                {!copied && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>}
              </button>
              <button
                onClick={handlePreviewHtml}
                className="w-full py-2 text-[9px] text-gray-400 hover:text-[#203864] font-black transition-colors uppercase tracking-[0.3em]"
              >
                Abrir código fonte para desenvolvedor
              </button>
            </div>
            
            <div className="mt-auto pt-8 border-t border-gray-200 mt-10">
               <p className="text-[9px] text-gray-400 leading-relaxed font-bold uppercase tracking-wider">
                  DICA: Cole no Outlook com Ctrl + V. Se a imagem não aparecer, verifique se o modo HTML está ativo.
               </p>
            </div>
          </div>
        </div>
      </div>

      <div ref={signatureRef} className="hidden">
        <SignaturePreview data={signatureData} isHtmlGeneration={true} signatureType={signatureType} />
      </div>
    </div>
  );
};

export default App;
