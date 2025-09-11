import React from 'react';
import { SignatureData } from '../types.ts';

interface SignaturePreviewProps {
  data: SignatureData;
  isHtmlGeneration?: boolean;
  signatureType: 'vpa_urbanismo' | 'grupo_vpa';
}

const SignaturePreview: React.FC<SignaturePreviewProps> = ({ data, isHtmlGeneration = false, signatureType }) => {
  const { name, title, phone, photo, mobile } = data;
  
  const isGrupoVpa = signatureType === 'grupo_vpa';

  const vpaUrbanismoLogoUrl = 'https://www.vpaurbanismo.com.br/assinatura/vpa_assinatura.png';
  const grupoVpaLogoUrl = 'https://vpaurbanismo.com.br/assinatura/grupovpa_assinatura.png';
  const logoUrl = isGrupoVpa ? grupoVpaLogoUrl : vpaUrbanismoLogoUrl;
  const logoAlt = isGrupoVpa ? "Grupo VPA" : "VPA Urbanismo";
  
  const newAddress = 'R. Levindo Lopes, 357 – 3º andar – Savassi, BH – MG.';
  
  const socialLinks = {
    instagram: 'https://www.instagram.com/vpaurbanismo',
    facebook: 'https://www.facebook.com/vpaurbanismo',
    linkedin: 'https://www.linkedin.com/company/grupo-vpa',
    youtube: 'https://www.youtube.com/@grupovpa',
  };

  const socialIcons = {
    instagram: 'https://www.vpaurbanismo.com.br/assinatura/Instagram-verde-48.png',
    facebook: 'https://www.vpaurbanismo.com.br/assinatura/facebook-verde-48.png',
    linkedin: 'https://www.vpaurbanismo.com.br/assinatura/linkedin_verde-48.png',
    youtube: 'https://vpaurbanismo.com.br/assinatura/youtube-verde-48.png',
  };


  if (isHtmlGeneration) {
    const titleColor = isGrupoVpa ? '#808080' : '#19a649';
    // Replicate the provided HTML structure for maximum email client compatibility.
    return (
      <div style={{ fontFamily: 'Calibri, sans-serif', fontSize: '11pt' }}>
        <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              {/* Logo & Socials Cell */}
              <td style={{ width: '97.5pt', padding: '0 5.4pt', verticalAlign: 'middle' }}>
                <p style={{ textAlign: 'center', margin: '0' }}>
                  <a href="https://www.vpaurbanismo.com.br" target="_blank" rel="noopener noreferrer">
                    <img src={logoUrl} alt={logoAlt} width="130" height="74" style={{ display: 'block', border: '0' }} />
                  </a>
                </p>
                 {!isGrupoVpa && (
                    <p style={{ textAlign: 'center', margin: '0', paddingTop: '8px' }}>
                      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginRight: '8px' }}>
                          <img src={socialIcons.linkedin} alt="LinkedIn" width="20" height="20" style={{ border: 0, display: 'inline-block' }} />
                      </a>
                      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginRight: '8px' }}>
                          <img src={socialIcons.instagram} alt="Instagram" width="20" height="20" style={{ border: 0, display: 'inline-block' }} />
                      </a>
                      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginRight: '8px' }}>
                          <img src={socialIcons.facebook} alt="Facebook" width="20" height="20" style={{ border: 0, display: 'inline-block' }} />
                      </a>
                      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                          <img src={socialIcons.youtube} alt="YouTube" width="20" height="20" style={{ border: 0, display: 'inline-block' }} />
                      </a>
                    </p>
                 )}
              </td>
              
              {/* Photo Cell */}
              <td style={{ width: '70pt', padding: '0 5.4pt', verticalAlign: 'middle' }}>
                 <p style={{ textAlign: 'center', margin: '0' }}>
                    <img src={photo} alt="Foto" width="92" height="92" style={{ display: 'block', border: '0', borderRadius: '8px' }} />
                 </p>
              </td>
              
              {/* Info Cell */}
              <td style={{ width: '243.25pt', padding: '0 5.4pt', verticalAlign: 'top' }}>
                <p style={{ margin: '0.1pt', lineHeight: '14.4pt' }}>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '12pt', fontWeight: 'bold', color: '#203864' }}>{name}</span><br />
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '10pt', fontWeight: 'bold', color: titleColor }}>{title}</span><br />
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '9pt', fontWeight: 'bold', color: '#203864' }}>
                    {phone}
                    {mobile && <span> | </span>}
                    {mobile && mobile}
                  </span>
                </p>
                <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '244.55pt' }}>
                  <tbody>
                    <tr style={{ height: '6.8pt' }}>
                      <td style={{ borderTop: '1pt solid #203864', paddingTop: '5.25pt', verticalAlign: 'middle' }}>
                        <p style={{ margin: '0.75pt', lineHeight: '11pt' }}>
                          <a href="https://www.vpaurbanismo.com.br" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '9pt', fontWeight: 'bold', color: '#203864' }}>www.vpaurbanismo.com.br</span>
                          </a>
                        </p>
                      </td>
                    </tr>
                    <tr style={{ height: '7.2pt' }}>
                      <td style={{ paddingTop: '5.25pt', verticalAlign: 'middle' }}>
                        <p style={{ margin: '0.75pt', lineHeight: '9pt', fontFamily: 'Calibri, sans-serif', fontSize: '9pt', color: '#7f7f7f' }}>
                          {newAddress}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // For live preview, mimic the new styles with Tailwind.
  const titleColorClass = isGrupoVpa ? 'text-gray-500' : 'text-[#19a649]';
  return (
    <div className="font-sans w-full">
      <div className="flex items-center">
        {/* Logo & Socials */}
        <div className="px-2 flex flex-col items-center flex-shrink-0">
           <a href="https://www.vpaurbanismo.com.br" target="_blank" rel="noopener noreferrer">
             <img src={logoUrl} alt={logoAlt} className="w-[130px] h-[74px]" />
           </a>
           {!isGrupoVpa && (
            <div className="w-[130px]">
              <div className="mt-2 flex items-center justify-center">
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="mr-2">
                    <img src={socialIcons.linkedin} alt="LinkedIn" className="w-5 h-5" />
                  </a>
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="mr-2">
                    <img src={socialIcons.instagram} alt="Instagram" className="w-5 h-5" />
                  </a>
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="mr-2">
                    <img src={socialIcons.facebook} alt="Facebook" className="w-5 h-5" />
                  </a>
                  <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                    <img src={socialIcons.youtube} alt="YouTube" className="w-5 h-5" />
                  </a>
                </div>
              </div>
           )}
        </div>
        {/* Photo */}
        <div className="px-2 flex-shrink-0">
          <img src={photo} alt="Foto" className="w-[92px] h-[92px] object-cover rounded-lg" />
        </div>
        {/* Info */}
        <div className="flex-grow px-2 self-start">
          <p className="font-bold text-[12pt] text-[#203864] m-0 leading-tight">{name}</p>
          <p className={`text-[10pt] font-bold m-0 leading-tight ${titleColorClass}`}>{title}</p>
          <p className="text-[9pt] font-bold m-0 leading-tight text-[#203864]">
             {phone}
             {mobile && <span> | </span>}
             {mobile}
          </p>
          <div className="border-t border-[#203864] pt-1 mt-1">
            <a href="https://www.vpaurbanismo.com.br" target="_blank" rel="noopener noreferrer" className="text-[#203864] no-underline text-[9pt] font-bold">
              www.vpaurbanismo.com.br
            </a>
            <p className="text-[#7f7f7f] text-[9pt] m-0 pt-1 leading-tight">{newAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignaturePreview;