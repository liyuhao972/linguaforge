import { Link } from "react-router-dom";
import { Brain, Globe, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                LinguaForge
              </span>
            </div>
            <p className="text-sm text-white/60 max-w-md">
              基于艾宾浩斯遗忘曲线的智能英语学习平台，融合词汇积累、语法教学、听说训练、新闻精读四大核心模块。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">学习模块</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/vocabulary" className="hover:text-amber transition-colors">词汇积累</Link></li>
              <li><Link to="/grammar" className="hover:text-amber transition-colors">语法教学</Link></li>
              <li><Link to="/listening" className="hover:text-amber transition-colors">听说训练</Link></li>
              <li><Link to="/reading" className="hover:text-amber transition-colors">新闻精读</Link></li>
              <li><Link to="/review" className="hover:text-amber transition-colors">复习中心</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">联系我们</h3>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/40">
          <p>© 2026 LinguaForge. All rights reserved. 由 Hermes Agent 构建。</p>
        </div>
      </div>
    </footer>
  );
}
