
import React, { useState, FormEvent } from 'react';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

const CORRECT_PASSWORD = 'vpa2024';

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-gray-100 relative overflow-hidden">
            <div className="text-center mb-12">
                <img 
                  src="https://www.vpaurbanismo.com.br/assinaturadeemail/vpa_assinatura.png" 
                  alt="VPA Urbanismo" 
                  className="w-[180px] h-auto object-contain mx-auto mb-10" 
                />
                
                <h1 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Plataforma Oficial</h1>
                <h2 className="text-4xl font-black text-[#203864] leading-tight tracking-tighter">
                  Gerador de<br/>Assinatura <span className="text-[#19a649]">2.0</span>
                </h2>
                <p className="text-[#203864] text-[10px] font-bold uppercase tracking-[0.2em] mt-4 opacity-40">Sistemas VPA</p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-inner">
                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">Senha de Segurança</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#19a649]/20 focus:border-[#19a649] text-center font-bold text-[#203864] text-xl transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                    
                    {error && (
                      <p className="text-red-600 text-[11px] font-black text-center animate-pulse bg-red-50 py-2 rounded-lg">
                        {error}
                      </p>
                    )}
                    
                    <button
                        type="submit"
                        className="w-full text-white font-black py-5 px-4 rounded-2xl transition-all duration-300 bg-[#203864] hover:bg-[#1a2d52] shadow-xl hover:shadow-[#203864]/20 active:scale-[0.97] uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                    >
                        ACESSAR FERRAMENTA 2.0
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                </form>
            </div>
            
            <p className="text-center text-gray-300 text-[8px] mt-10 font-bold uppercase tracking-[0.4em]">
              © 2024 VPA Urbanismo • Marketing
            </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordProtection;
