import React, { useCallback, useRef, useState } from 'react';
import { SignatureData } from './types.ts';
import ImageUploader from './components/ImageUploader.tsx';
import SignaturePreview from './components/SignaturePreview.tsx';

type SignatureType = 'vpa_urbanismo' | 'grupo_vpa';

const VPA_URBANISMO_LOGO_URL = 'https://www.vpaurbanismo.com.br/assinaturadeemail/vpa_assinatura.png';
const GRUPO_VPA_LOGO_URL = 'https://www.vpaurbanismo.com.br/assinaturadeemail/grupovpa_assinatura.png';
const fieldClass = 'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-[#223970] outline-none transition focus:border-[#19a649] focus:ring-4 focus:ring-[#19a649]/15';

const App: React.FC = () => {
  const [signatureData, setSignatureData] = useState<SignatureData>({ name: 'Carolina Lattanzio', title: 'Gente e Gestão', phone: '(31) 2118-4361', mobile: '', photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', photoUrl: '' });
  const [copied, setCopied] = useState(false);
  const [signatureType, setSignatureType] = useState<SignatureType>('grupo_vpa');
  const signatureRef = useRef<HTMLDivElement>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { const { name, value } = event.target; setSignatureData((current) => ({ ...current, [name]: value })); };
  const handlePhotoUpload = (photo: string) => setSignatureData((current) => ({ ...current, photo, photoUrl: '' }));
  const handleUrlChange = (photoUrl: string) => setSignatureData((current) => ({ ...current, photoUrl }));
  const copyHtmlToClipboard = useCallback(() => {
    if (!signatureRef.current) return;
    const htmlContent = signatureRef.current.innerHTML;
    const listener = (event: ClipboardEvent) => { event.clipboardData?.setData('text/html', htmlContent); event.clipboardData?.setData('text/plain', htmlContent); event.preventDefault(); };
    document.addEventListener('copy', listener);
    try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2000); } finally { document.removeEventListener('copy', listener); }
  }, []);
  const handlePreviewHtml = useCallback(() => { if (!signatureRef.current) return; const preview = window.open(); if (!preview) return; preview.document.write(`<html><head><title>Pré visualização da assinatura</title></head><body style="padding:20px;font-family:Arial,sans-serif;">${signatureRef.current.innerHTML}</body></html>`); preview.document.close(); }, []);

  return (
    <div className="min-h-screen bg-[#f4f6fa] px-4 py-8 font-sans md:py-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(32,56,100,0.12)]">
        <header className="flex flex-col gap-6 border-b border-slate-200 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#19a649]">VPA Urbanismo</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-[#223970]">Gerador de Assinaturas</h1><p className="mt-1 text-sm text-slate-500">Crie e copie sua assinatura para o Outlook.</p></div>
          <div className="flex w-full rounded-xl bg-slate-100 p-1 md:w-auto" role="group" aria-label="Modelo de assinatura">
            <button onClick={() => setSignatureType('vpa_urbanismo')} className={`flex flex-1 flex-col items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold transition md:w-32 ${signatureType === 'vpa_urbanismo' ? 'bg-white text-[#223970] shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-[#223970]'}`}><img src={VPA_URBANISMO_LOGO_URL} alt="" className="h-6 object-contain" /><span className="mt-1">MODELO VPA</span></button>
            <button onClick={() => setSignatureType('grupo_vpa')} className={`flex flex-1 flex-col items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold transition md:w-32 ${signatureType === 'grupo_vpa' ? 'bg-white text-[#223970] shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-[#223970]'}`}><img src={GRUPO_VPA_LOGO_URL} alt="" className="h-6 object-contain" /><span className="mt-1">MODELO GRUPO</span></button>
          </div>
        </header>
        <main className="grid lg:grid-cols-[0.95fr_1.25fr]">
          <section className="border-b border-slate-200 px-6 py-8 lg:border-b-0 lg:border-r lg:px-10">
            <h2 className="text-lg font-bold text-[#223970]">Seus dados</h2><p className="mb-7 mt-1 text-sm text-slate-500">Personalize sua assinatura.</p>
            <ImageUploader onPhotoUpload={handlePhotoUpload} onUrlChange={handleUrlChange} currentPhoto={signatureData.photo} currentUrl={signatureData.photoUrl} />
            <div className="mt-8 space-y-5">
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Nome completo</label><input type="text" name="name" value={signatureData.name} onChange={handleInputChange} className={fieldClass} /></div>
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Cargo ou função</label><input type="text" name="title" value={signatureData.title} onChange={handleInputChange} className={fieldClass} /></div>
              <div className="grid gap-5 sm:grid-cols-2"><div><label className="mb-2 block text-sm font-medium text-slate-700">Telefone fixo</label><input type="text" name="phone" value={signatureData.phone} onChange={handleInputChange} className={fieldClass} /></div><div><label className="mb-2 block text-sm font-medium text-slate-700">Celular</label><input type="text" name="mobile" value={signatureData.mobile} onChange={handleInputChange} placeholder="Opcional" className={fieldClass} /></div></div>
            </div>
          </section>
          <section className="flex flex-col bg-slate-50 px-6 py-8 lg:px-10">
            <h2 className="text-lg font-bold text-[#223970]">Pré visualização</h2><p className="mt-1 text-sm text-slate-500">Confira antes de copiar para o Outlook.</p>
            <div className="mt-7 flex min-h-[250px] items-center justify-center overflow-x-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"><SignaturePreview data={signatureData} signatureType={signatureType} /></div>
            <button onClick={copyHtmlToClipboard} className={`mt-7 flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-sm font-bold text-white shadow-lg transition focus:outline-none focus:ring-4 focus:ring-[#223970]/25 ${copied ? 'bg-[#19a649]' : 'bg-[#223970] hover:bg-[#172c5d]'}`}>{copied ? 'Assinatura copiada' : 'Copiar assinatura'} {!copied && <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}</button>
            <button onClick={handlePreviewHtml} className="mt-4 w-full text-sm font-medium text-[#223970] underline decoration-slate-300 underline-offset-4 transition hover:text-[#19a649]">Abrir pré visualização em uma nova janela</button>
            <p className="mt-8 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">Cole a assinatura diretamente no Outlook com <strong className="font-semibold text-slate-700">Ctrl + V</strong>. Não altere o tamanho das imagens após colar.</p>
          </section>
        </main>
      </div>
      <div ref={signatureRef} className="hidden"><SignaturePreview data={signatureData} isHtmlGeneration={true} signatureType={signatureType} /></div>
    </div>
  );
};

export default App;
