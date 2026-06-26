import React, { useState } from 'react';
import { Send, Trash2, Key, Terminal } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'encrypting' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const handleClear = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
    setLogs([]);
  };

  const addLog = (msg: string, delay: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
        resolve();
      }, delay);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Por favor preencha todos os campos obrigatórios.");
      return;
    }

    setStatus('encrypting');
    setLogs([]);

    // Simulate encryption sequences
    await addLog("SEC_HANDSHAKE: Estabelecendo canal seguro...", 200);
    await addLog("CRYPT_ENGINE: Inicializando algoritmo RSA-4096...", 400);
    await addLog(`PAYLOAD_PACKER: Empacotando dados de <${formData.email}>...`, 300);
    await addLog("CIPHER_STREAM: Encriptando dados com AES-256-GCM...", 500);

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Security Contact Form Portfolio",
          message: formData.message
        })
      });

      const result = await response.json();

      if (result.success) {
        await addLog("SEC_DISPATCH: Assinatura digital verificada.", 300);
        await addLog("SEC_DISPATCH: Payload enviado com sucesso para o gateway principal.", 200);
        setStatus('success');
      } else {
        await addLog(`SEC_DISPATCH_ERROR: Falha na validação do token. Código: ${result.message}`, 200);
        setStatus('error');
      }
    } catch (err) {
      await addLog("SEC_DISPATCH_ERROR: Falha crítica na rota de rede ou servidor inacessível.", 200);
      setStatus('error');
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 px-6 md:px-12 max-w-4xl mx-auto w-full relative"
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-16">
        <div className="flex flex-col">
          <span className="font-mono text-xs text-cerulean font-bold uppercase tracking-widest">// SECURE_UPLINK</span>
          <h2 className="text-3xl font-extrabold text-slate-dark font-sans mt-1">Send Ciphered Message</h2>
        </div>
        <div className="h-10 w-10 rounded-xl bg-clean-bg shadow-neumorphic-sm-out border border-white/60 flex items-center justify-center text-slate-400">
          <Terminal className="h-5 w-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Terminal Info panel */}
        <div className="p-6 rounded-3xl bg-clean-bg border border-white/60 shadow-neumorphic-in flex flex-col justify-between font-mono text-xs text-slate-500">
          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-700 font-bold">
              <Key className="h-4 w-4 text-cerulean" />
              <span>// SECURITY_PROTOCOL</span>
            </div>
            <p className="leading-relaxed mb-4">
              Qualquer mensagem transmitida através deste canal seguro é encapsulada em SSL e enviada por protocolo criptográfico direto ao destinatário.
            </p>
            <div className="p-3 bg-slate-100/50 rounded-lg border border-slate-200/30 flex flex-col gap-1">
              <div>ALGORITHM: <span className="text-slate-700 font-bold">AES-256-GCM</span></div>
              <div>AUTH_GATEWAY: <span className="text-slate-700 font-bold">Web3Forms</span></div>
              <div>ENV_KEY: <span className="text-emerald-600 font-bold">{import.meta.env.VITE_WEB3FORMS_KEY ? "CONFIGURED" : "FALLBACK"}</span></div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200/50 pt-4">
            <span className="text-[10px] text-slate-400 block uppercase">GATEWAY TARGET</span>
            <span className="text-slate-700 font-semibold font-mono">itsalem@gmx.de</span>
          </div>
        </div>

        {/* Interactive Form Panel */}
        <div className="md:col-span-2 p-6 md:p-8 rounded-3xl bg-clean-bg border border-white/60 shadow-neumorphic-out relative overflow-hidden">
          {status === 'encrypting' || status === 'success' || status === 'error' ? (
            /* Ciphering terminal log screen overlay */
            <div className="absolute inset-0 bg-slate-900 text-slate-300 font-mono p-6 flex flex-col justify-between z-20">
              <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[80%]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="text-xs text-emerald-400 font-bold">// SECURE CRYPTO TRANSMISSION LOGS</span>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">AES-256</span>
                </div>
                {logs.map((log, index) => (
                  <div key={index} className="text-xs leading-relaxed text-emerald-500 animate-[fadeIn_0.2s_ease-out]">
                    {log}
                  </div>
                ))}
                {status === 'encrypting' && (
                  <div className="text-xs text-cerulean animate-pulse">
                    &gt; Processando e efetuando handshake...
                  </div>
                )}
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-xs">
                <span>STATUS: <span className={status === 'success' ? 'text-emerald-400 font-bold' : status === 'error' ? 'text-red-400 font-bold' : 'text-amber-400'}>{status.toUpperCase()}</span></span>
                {status !== 'encrypting' && (
                  <button 
                    onClick={handleClear}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded font-mono text-[10px] border border-slate-700 cursor-pointer"
                  >
                    VOLTAR_AO_FORMULARIO
                  </button>
                )}
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[10px] text-slate-400 uppercase font-bold">NOME / IDENTITY</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="px-4 py-2.5 rounded-xl border border-white bg-clean-bg shadow-neumorphic-sm-in text-slate-dark text-xs font-mono focus:outline-none focus:border-cerulean/50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-[10px] text-slate-400 uppercase font-bold">EMAIL / UPLINK</label>
                <input 
                  type="email" 
                  required
                  placeholder="Ex: john@corporate.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="px-4 py-2.5 rounded-xl border border-white bg-clean-bg shadow-neumorphic-sm-in text-slate-dark text-xs font-mono focus:outline-none focus:border-cerulean/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] text-slate-400 uppercase font-bold">ASSUNTO / METADATA</label>
              <input 
                type="text" 
                placeholder="Ex: Security Auditing / Integration Project"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="px-4 py-2.5 rounded-xl border border-white bg-clean-bg shadow-neumorphic-sm-in text-slate-dark text-xs font-mono focus:outline-none focus:border-cerulean/50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] text-slate-400 uppercase font-bold">MENSAGEM / PAYLOAD</label>
              <textarea 
                rows={4}
                required
                placeholder="Introduza o corpo da mensagem para transmissão encriptada..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="px-4 py-2.5 rounded-xl border border-white bg-clean-bg shadow-neumorphic-sm-in text-slate-dark text-xs font-mono focus:outline-none focus:border-cerulean/50 resize-none"
              />
            </div>

            {/* Action Triggers */}
            <div className="flex justify-end gap-3 mt-2 border-t border-slate-200/50 pt-4">
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-medium bg-clean-bg border border-white/60 transition-all select-none neu-button cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>LIMPAR</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-mono font-extrabold text-slate-dark bg-clean-bg border border-white transition-all select-none neu-button cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 text-cerulean" />
                <span>ENVIAR_PAYLOAD</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
