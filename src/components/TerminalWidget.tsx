'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { HiTerminal, HiX } from 'react-icons/hi';

interface LogLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export default function TerminalWidget() {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<LogLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize terminal welcome logs
  useEffect(() => {
    if (isRtl) {
      setLogs([
        { text: 'نظام تشغيل عادل منير الإصدار 1.0.0', type: 'success' },
        { text: 'جميع الحقوق محفوظة لمطور الويب عادل منير.', type: 'output' },
        { text: "اكتب 'help' لعرض الأوامر البرمجية المتاحة.", type: 'output' },
        { text: '', type: 'output' },
      ]);
    } else {
      setLogs([
        { text: 'Adel Mounir OS Version 1.0.0', type: 'success' },
        { text: 'All rights reserved to Full-Stack Developer Adel Mounir.', type: 'output' },
        { text: "Type 'help' to list available commands.", type: 'output' },
        { text: '', type: 'output' },
      ]);
    }
  }, [isRtl]);

  // Scroll to bottom on log updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    const newLogs = [...logs, { text: `adel@dev:~$ ${inputVal}`, type: 'input' as const }];
    setInputVal('');

    const addOutput = (text: string, type: 'output' | 'error' | 'success' = 'output') => {
      newLogs.push({ text, type });
    };

    switch (command) {
      case 'clear':
      case 'cls':
        setLogs([]);
        return;
      case 'exit':
      case 'close':
        setIsOpen(false);
        return;
      case 'help':
      case '?':
        if (isRtl) {
          addOutput('الأوامر المتاحة:', 'success');
          addOutput('  about    - نبذة مختصرة عن المطور وعمله');
          addOutput('  skills   - عرض المهارات البرمجية كشجرة هيكلية');
          addOutput('  projects - عرض قائمة بالمشاريع المنجزة حالياً');
          addOutput('  system   - معلومات نظام التشغيل الافتراضي');
          addOutput('  hack     - تفعيل وضع الاختراق البرمجي للتسلية');
          addOutput('  clear    - مسح شاشة سطر الأوامر');
          addOutput('  exit     - إغلاق نافذة الأوامر');
        } else {
          addOutput('Available Commands:', 'success');
          addOutput('  about    - Technical profile summary');
          addOutput('  skills   - Structured tree view of tech stack');
          addOutput('  projects - Show list of shipped projects');
          addOutput('  system   - View virtual OS specifications');
          addOutput('  hack     - Run a fun hacker decryption animation');
          addOutput('  clear    - Clear terminal logs');
          addOutput('  exit     - Close the terminal window');
        }
        break;
      case 'about':
        if (isRtl) {
          addOutput('نبذة عن المطور عادل منير:', 'success');
          addOutput('مطور ويب متكامل محترف في بناء الأنظمة المؤسسية وتطبيقات الويب السحابية.');
          addOutput('متخصص في أتمتة العمليات وربط واجهات برمجة تطبيقات أمازون لشركاء البيع.');
          addOutput('قام بتطوير وتسليم أكثر من 25 نظاماً برمجياً متكاملاً يعمل في بيئات إنتاج حقيقية.');
        } else {
          addOutput('About Adel Mounir:', 'success');
          addOutput('Professional Full-Stack Developer specialized in enterprise architectures.');
          addOutput('Expert in Amazon Selling Partner API integrations and task automation.');
          addOutput('Successfully designed and deployed 25+ integration-rich production systems.');
        }
        break;
      case 'skills':
        if (isRtl) {
          addOutput('شجرة المهارات والترسانة التقنية:', 'success');
          addOutput('التقنيات الأساسية');
          addOutput('    ├── React / Next.js');
          addOutput('    ├── TypeScript & JavaScript');
          addOutput('    ├── Python / FastAPI');
          addOutput('    └── Amazon SP-API Integration');
          addOutput('متمكن من');
          addOutput('    ├── Node.js / NestJS & .NET 8 / C#');
          addOutput('    ├── PostgreSQL / SQLite / Docker');
          addOutput('    └── Electron / Web Scraping');
          addOutput('على دراية بـ');
          addOutput('    └── Redis / MongoDB / PWA / Pandas');
        } else {
          addOutput('Tech Stack Structure:', 'success');
          addOutput('Core Stack');
          addOutput('    ├── React / Next.js');
          addOutput('    ├── TypeScript & JavaScript');
          addOutput('    ├── Python / FastAPI');
          addOutput('    └── Amazon SP-API Integration');
          addOutput('Proficient In');
          addOutput('    ├── Node.js / NestJS & .NET 8 / C#');
          addOutput('    ├── PostgreSQL / SQLite / Docker');
          addOutput('    └── Electron / Web Scraping');
          addOutput('Familiar With');
          addOutput('    └── Redis / MongoDB / PWA / Pandas');
        }
        break;
      case 'projects':
        if (isRtl) {
          addOutput('أبرز المشاريع الحية والمنشورة:', 'success');
          addOutput('• Apex Commerce - https://60sec.shop/');
          addOutput('• Darb Almaha Page - https://darbalmaha.com/');
          addOutput('• XP Black Automations - https://xp-black.com/');
          addOutput('• Ahla Makan Cleaning - https://ahla-makan.com/');
          addOutput('• KitVet Veterinary Tech - https://kitvet.com/');
        } else {
          addOutput('Featured Shipped Projects:', 'success');
          addOutput('• Apex Commerce - https://60sec.shop/');
          addOutput('• Darb Almaha Page - https://darbalmaha.com/');
          addOutput('• XP Black Automations - https://xp-black.com/');
          addOutput('• Ahla Makan Cleaning - https://ahla-makan.com/');
          addOutput('• KitVet Veterinary Tech - https://kitvet.com/');
        }
        break;
      case 'system':
        addOutput('HOST: adel.60sec.shop');
        addOutput('OS: AdelOS Kernel v1.0.0-stable');
        addOutput('LOC: Cairo, Egypt / Remote');
        addOutput('AVAILABILITY: Available for Freelance Contracts & Freelance work');
        addOutput(`SHELL: React-Terminal-JS / NextJS ${locale === 'ar' ? 'العربية' : 'English'}`);
        break;
      case 'hack':
        addOutput('>>> بدء عملية تجاوز الجدار الناري المالي...', 'error');
        addOutput('>>> فك تشفير مفتاح أتمتة Amazon SP-API...', 'error');
        addOutput('>>> الاتصال بقاعدة بيانات PostgreSQL مشفرة...', 'error');
        addOutput('>>> تم اختراق سطر الأوامر بنجاح... استمتع بالتصفح!', 'success');
        break;
      default:
        if (isRtl) {
          addOutput(`الأمر غير معروف: '${command}'. اكتب 'help' لرؤية الأوامر المتاحة.`, 'error');
        } else {
          addOutput(`Unknown command: '${command}'. Type 'help' to see available commands.`, 'error');
        }
        break;
    }
    setLogs(newLogs);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="terminal-floating-container">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open Terminal DevConsole"
        >
          <HiTerminal className="w-6 h-6 animate-pulse" />
        </button>
        <div className="terminal-tooltip font-mono text-[10px] border border-cyan-500/25">
          {isRtl ? 'افتح سطر الأوامر التفاعلي >_' : 'Open DevConsole Terminal >_'}
        </div>
      </div>

      {/* Terminal Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`fixed bottom-40 ${isRtl ? 'right-6 md:right-8' : 'left-6 md:left-8'} w-[90vw] sm:w-[450px] md:w-[500px] h-[320px] rounded-2xl bg-[#030312]/95 backdrop-blur-md border border-cyan-500/30 shadow-2xl flex flex-col overflow-hidden z-[100]`}
          >
            {/* macOS Window Title Bar */}
            <div className="h-10 bg-[#0d0d24] border-b border-cyan-500/15 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
                adel-mounir-terminal.sh
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--text-secondary)] hover:text-white p-1"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body log */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1.5 scrollbar-thin"
              dir="ltr"
            >
              {logs.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === 'input'
                      ? 'text-cyan-400 font-bold'
                      : line.type === 'error'
                      ? 'text-red-400 font-medium'
                      : line.type === 'success'
                      ? 'text-emerald-400 font-medium'
                      : 'text-slate-300'
                  }
                >
                  {line.text}
                </div>
              ))}

              {/* Command Input Form */}
              <form onSubmit={handleCommand} className="flex items-center gap-1.5 text-cyan-400 pt-1">
                <span className="shrink-0 font-bold">adel@dev:~$</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-[11px] text-cyan-200 caret-cyan-400"
                  autoFocus
                  placeholder={isRtl ? "اكتب الأمر هنا..." : "type command..."}
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

