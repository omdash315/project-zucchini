"use client";

import { ArrowRight, Users, Award, BookOpen, Globe } from "lucide-react";

interface MunInfoStepProps {
  onProceedToRegister: () => void;
}

export function MunInfoStep({ onProceedToRegister }: MunInfoStepProps) {
  return (
    <div className="text-center py-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-baloo">
          Welcome to NITRIMUN
        </h1>
        <p className="text-white/80 text-lg font-inria">
          NIT Rourkela&apos;s Flagship Model United Nations Conference
        </p>
      </div>

      {/* About Section */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-8 text-left border border-white/10">
        <div className="space-y-4 text-white/90 font-inria leading-relaxed">
          <p>
            <span className="text-white font-semibold">NITRIMUN</span> is the annual flagship Model
            United Nations conference of NIT Rourkela, organised by{" "}
            <span className="text-white font-semibold">Cognizen</span>, the institute&apos;s
            official History, Politics, and Economics awareness club. It brings together students
            from across India to simulate United Nations and Indian parliamentary bodies, fostering
            rigorous debate on global and national issues.
          </p>
          <p>
            Known for its academically strong committees, realistic crisis simulations, and
            well-researched agendas, NITRIMUN emphasises diplomacy, policy analysis, and
            collaborative problem-solving. Delegates engage in structured deliberations, draft
            resolutions, and respond to evolving crises, developing skills in public speaking,
            negotiation, and leadership.
          </p>
          <p>
            Beyond debate, NITRIMUN stands out for its professional execution, inclusive
            environment, and mentorship-driven experience for first-time delegates, while still
            challenging seasoned MUNers. Hosted on the vibrant NIT Rourkela campus, the conference
            has grown into a respected platform that blends intellectual depth with impactful
            discourse, inspiring young leaders to turn ideas into action.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <p className="text-white/90 text-sm font-inria">Global Simulations</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-white/90 text-sm font-inria">Networking</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <p className="text-white/90 text-sm font-inria">Research & Debate</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <p className="text-white/90 text-sm font-inria">Leadership Skills</p>
        </div>
      </div>

      {/* Register Button */}
      <button
        onClick={onProceedToRegister}
        className="gradient-border-btn group inline-flex items-center gap-3 px-8 py-4 text-white font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] font-inria"
      >
        <span className="text-lg">Register Now</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
