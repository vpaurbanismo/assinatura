
import React from 'react';
import { SignatureData } from '../types.ts';

interface SignaturePreviewProps {
  data: SignatureData;
  isHtmlGeneration?: boolean;
  signatureType: 'vpa_urbanismo' | 'grupo_vpa';
}

const SignaturePreview: React.FC<SignaturePreviewProps> = ({ data, isHtmlGeneration = false, signatureType }) => {
  const { name, title, phone, photo, photoUrl, mobile } = data;
  
  const isGrupoVpa = signatureType === 'grupo_vpa';
  const vpaUrbanismoLogoUrl = 'https://www.vpaurbanismo.com.br/assinaturadeemail/vpa_assinatura.png';
  const grupoVpaLogoUrl = 'https://vpaurbanismo.com.br/assinaturadeemail/grupovpa_assinatura.png';
  const logoUrl = isGrupoVpa ? grupoVpaLogoUrl : vpaUrbanismoLogoUrl;
  const logoAlt = isGrupoVpa ? "Grupo VPA" : "VPA Urbanismo";
  
  const currentPhoto = (photoUrl && photoUrl.trim() !== '') ? photoUrl : photo;
  const newAddress = 'R. Levindo Lopes, 357 – 3º andar – Savassi, BH – MG.';
  
  const socialIcons = {
    instagram: 'https://www.vpaurbanismo.com.br/assinaturadeemail/Instagram-verde-48.png',
    facebook: 'https://www.vpaurbanismo.com.br/assinaturadeemail/facebook-verde-48.png',
    linkedin: 'https://www.vpaurbanismo.com.br/assinaturadeemail/linkedin_verde-48.png',
    youtube: 'https://vpaurbanismo.com.br/assinaturadeemail/youtube-verde-48.png',
  };

  if (isHtmlGeneration) {
    const titleColor = isGrupoVpa ? '#808080' : '#19a649';
    return (
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse', border: 'none' }}>
          <tbody>
            <tr>
              <td style={{ width: '130px', padding: '0 10px 0 0', verticalAlign: 'middle', borderRight: '1px solid #E0E0E0' }}>
                <p style={{ textAlign: 'center', margin: '0' }}>
                  <a href="https://www.vpaurbanismo.com.br" target="_blank" rel="noopener noreferrer">
                    <img src={logoUrl} alt={logoAlt} width="130" height="74" style={{ display: 'block', border: '0' }} />
                  </a>
                </p>
                 {!isGrupoVpa && (
                    <p style={{ textAlign: 'center', margin: '0', paddingTop: '8px', lineHeight: '1' }}>
                      <a href="https://www.linkedin.com/company/grupo-vpa" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginRight: '4px' }}>
                          <img src={socialIcons.linkedin} alt="LI" width="18" height="18" style={{ border: 0, display: 'inline-block' }} />
                      </a>
                      <a href="https://www.instagram.com/vpaurbanismo" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginRight: '4px' }}>
                          <img src={socialIcons.instagram} alt="IG" width="18" height="18" style={{ border: 0, display: 'inline-block' }} />
                      </a>
                      <a href="https://www.facebook.com/vpaurbanismo" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginRight: '4px' }}>
                          <img src={socialIcons.facebook} alt="FB" width="18" height="18" style={{ border: 0, display: 'inline-block' }} />
                      </a>
                      <a href="https://www.youtube.com/@grupovpa" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                          <img src={socialIcons.youtube} alt="YT" width="18" height="18" style={{ border: 0, display: 'inline-block' }} />
                      </a>
                    </p>
                 )}
              </td>
              
              <td style={{ width: '100px', padding: '0 10px', verticalAlign: 'middle' }}>
                 <p style={{ textAlign: 'center', margin: '0' }}>
                    <img src={currentPhoto} alt="Foto" width="92" height="92" style={{ display: 'block', border: '0', borderRadius: '8px' }} />
                 </p>
              </td>
              
              <td style={{ padding: '0 10px', verticalAlign: 'top' }}>
                <p style={{ margin: '0', lineHeight: '1.2' }}>
                  <span style={{ fontSize: '12pt', fontWeight: 'bold', color: '#203864' }}>{name}</span><br />
                  <span style={{ fontSize: '10pt', fontWeight: 'bold', color: titleColor }}>{title}</span><br />
                  <span style={{ fontSize: '9pt', fontWeight: 'bold', color: '#203864' }}>
                    {phone} {mobile && ` | ${mobile}`}
                  </span>
                </p>
                <div style={{ marginTop: '6px', borderTop: '1px solid #203864', paddingTop: '4px' }}>
                  <p style={{ margin: '0', lineHeight: '1.2' }}>
                    <a href="https://www.vpaurbanismo.com.br" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <span style={{ fontSize: '9pt', fontWeight: 'bold', color: '#203864' }}>www.vpaurbanismo.com.br</span>
                    </a>
                  </p>
                  <p style={{ margin: '2px 0 0 0', lineHeight: '1.1', fontSize: '8.5pt', color: '#7f7f7f' }}>
                    {newAddress}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  const titleColorClass = isGrupoVpa ? 'text-gray-500' : 'text-[#19a649]';
  return (
    <div className="font-sans min-w-[400px]">
      <div className="flex items-center">
        <div className="pr-3 flex flex-col items-center flex-shrink-0 border-r border-gray-200">
           <img src={logoUrl} alt={logoAlt} width="110" className="w-[110px] h-auto" />
           {!isGrupoVpa && (
            <div className="mt-2 flex items-center justify-center space-x-1">
                <img src={socialIcons.linkedin} alt="LI" width="16" height="16" className="w-4 h-4 opacity-70" />
                <img src={socialIcons.instagram} alt="IG" width="16" height="16" className="w-4 h-4 opacity-70" />
                <img src={socialIcons.facebook} alt="FB" width="16" height="16" className="w-4 h-4 opacity-70" />
                <img src={socialIcons.youtube} alt="YT" width="16" height="16" className="w-4 h-4 opacity-70" />
            </div>
           )}
        </div>
        <div className="px-3 flex-shrink-0">
          <img 
            src={currentPhoto} 
            alt="Foto" 
            width="85"
            height="85"
            className="w-[85px] h-[85px] object-cover rounded-lg border border-gray-100"
          />
        </div>
        <div className="flex-grow flex flex-col justify-start">
          <p className="font-bold text-[11pt] text-[#203864] leading-tight m-0">{name}</p>
          <p className={`text-[9pt] font-bold leading-tight m-0 ${titleColorClass}`}>{title}</p>
          <p className="text-[8.5pt] font-bold leading-tight m-0 text-[#203864] mt-1">
             {phone} {mobile && ` | ${mobile}`}
          </p>
          <div className="border-t border-[#203864] mt-1 pt-1">
            <p className="text-[#203864] text-[8.5pt] font-bold m-0">www.vpaurbanismo.com.br</p>
            <p className="text-[#7f7f7f] text-[7.5pt] m-0 leading-tight">{newAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignaturePreview;
