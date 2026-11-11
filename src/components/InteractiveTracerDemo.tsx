import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight, Zap, Info } from 'lucide-react';

export const InteractiveTracerDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [structureType, setStructureType] = useState<'array' | 'linked-list'>('array');

  // Array elements
  const arrayData = [
    { index: 0, val: 10, addr: '0x7ff00', status: 'normal' },
    { index: 1, val: 25, addr: '0x7ff04', status: 'normal' },
    { index: 2, val: 42, addr: '0x7ff08', status: 'normal' },
    { index: 3, val: 78, addr: '0x7ff0c', status: 'normal' },
    { index: 4, val: 99, addr: '0x7ff10', status: 'normal' },
  ];

  // Linked list elements
  const linkedData = [
    { id: 0, val: 12, addr: '0x10a20', nextAddr: '0x10b90' },
    { id: 1, val: 34, addr: '0x10b90', nextAddr: '0x10cf0' },
    { id: 2, val: 56, addr: '0x10cf0', nextAddr: '0x10f10' },
    { id: 3, val: 88, addr: '0x10f10', nextAddr: 'nullptr' },
  ];

  const totalSteps = structureType === 'array' ? arrayData.length : linkedData.length;

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev + 1) % totalSteps);
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <section id="tracer-demo" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
        
        {/* Header with Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                Interactive Engine Preview
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              C++ Spatial Memory &amp; Pointer Tracer
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Step through C++ pointers in real time. Watch addresses mutate by exact <code className="text-emerald-700 font-mono font-bold">sizeof(int)</code> increments.
            </p>
          </div>

          {/* Toggle structure type */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => { setStructureType('array'); setCurrentStep(0); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                structureType === 'array'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contiguous Array
            </button>
            <button
              onClick={() => { setStructureType('linked-list'); setCurrentStep(0); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                structureType === 'linked-list'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Heap Linked List
            </button>
          </div>
        </div>

        {/* Visualizer Interactive Stage */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleNextStep}
                className="neon-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Step Forward (`ptr++`)</span>
              </button>
              <button
                onClick={handleReset}
                className="bg-white px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="text-xs font-mono text-slate-600">
              Pointer Position: <strong className="text-emerald-700">Step {currentStep + 1} of {totalSteps}</strong>
            </div>
          </div>

          {/* Interactive Rendering Grid */}
          {structureType === 'array' ? (
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-600">
                Memory Block: <span className="text-emerald-700 font-bold">Contiguous int arr[5] (4 bytes per element)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {arrayData.map((item, idx) => {
                  const isCurrent = idx === currentStep;
                  return (
                    <div
                      key={item.index}
                      className={`p-4 rounded-2xl border transition-all duration-300 text-center relative ${
                        isCurrent
                          ? 'border-emerald-500 bg-white shadow-lg ring-2 ring-emerald-400/30 scale-105'
                          : 'border-slate-200 bg-white/70'
                      }`}
                    >
                      {/* Active Pointer Arrow Marker */}
                      {isCurrent && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-extrabold font-mono px-2 py-0.5 rounded-full shadow-xs">
                          *ptr
                        </div>
                      )}
                      
                      <div className="text-[10px] font-mono text-slate-500">
                        arr[{item.index}]
                      </div>
                      <div className={`text-2xl font-mono font-extrabold my-1.5 ${isCurrent ? 'text-slate-900' : 'text-slate-700'}`}>
                        {item.val}
                      </div>
                      <div className="text-[10px] font-mono text-emerald-800 bg-emerald-50 py-1 rounded border border-emerald-100 font-semibold">
                        {item.addr}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-600">
                Heap Nodes: <span className="text-cyan-700 font-bold">Non-contiguous Heap Allocation (`ListNode*`)</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 overflow-x-auto py-2">
                {linkedData.map((node, idx) => {
                  const isCurrent = idx === currentStep;
                  return (
                    <React.Fragment key={node.id}>
                      <div
                        className={`p-4 rounded-2xl border transition-all duration-300 min-w-[140px] text-center relative ${
                          isCurrent
                            ? 'border-cyan-500 bg-white shadow-lg ring-2 ring-cyan-400/30 scale-105'
                            : 'border-slate-200 bg-white/70'
                        }`}
                      >
                        {isCurrent && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-[9px] font-extrabold font-mono px-2 py-0.5 rounded-full shadow-xs">
                            curr
                          </div>
                        )}
                        <div className="text-[10px] font-mono text-cyan-700 font-bold">
                          Node @ {node.addr}
                        </div>
                        <div className="text-xl font-mono font-bold text-slate-900 my-1">
                          val: {node.val}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 bg-slate-100 py-0.5 rounded">
                          next: {node.nextAddr}
                        </div>
                      </div>

                      {idx < linkedData.length - 1 && (
                        <div className="text-cyan-600 flex items-center">
                          <ArrowRight className="w-5 h-5 animate-pulse" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {/* Explanation Terminal */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 font-mono text-xs text-slate-700 flex items-start gap-3 shadow-xs">
            <Info className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <span className="text-emerald-700 font-bold">Execution Inspection:</span>
              <p className="text-slate-600">
                {structureType === 'array' ? (
                  <>Current pointer address is <code className="text-emerald-700 font-bold">{arrayData[currentStep].addr}</code>. Dereferenced value is <code className="text-emerald-700 font-bold">*{arrayData[currentStep].val}</code>. Notice contiguous 4-byte jump (<code className="text-emerald-700 font-bold">+ sizeof(int)</code>) between consecutive memory indices.</>
                ) : (
                  <>Traversing dynamic heap chain. Dereferencing <code className="text-cyan-700 font-bold">curr-&gt;val ({linkedData[currentStep].val})</code>. Next target heap address is <code className="text-cyan-700 font-bold">{linkedData[currentStep].nextAddr}</code>.</>
                )}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
