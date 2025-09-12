import React, { useState, FormEvent } from 'react';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

// You can change the password here
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
            <img src="https://www.vpaurbanismo.com.br/assinaturadeemail/vpa_assinatura.png" alt="VPA Urbanismo Logo" className="w-[130px] h-[74px] object-contain mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-center text-[#003366] mb-2">Acesso Restrito</h2>
            <p className="text-center text-gray-600 mb-6">Por favor, insira a senha para continuar.</p>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">Senha</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                        placeholder="Digite a senha"
                        aria-describedby="password-error"
                    />
                </div>
                {error && <p id="password-error" className="text-red-500 text-sm text-center">{error}</p>}
                <button
                    type="submit"
                    className="w-full text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 bg-[#003366] hover:bg-[#002244]"
                >
                    Acessar
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordProtection;