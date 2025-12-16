import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Westlake Data Intelligence</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm">
            构建具身智能的生成式数据闭环。
            <br />
            Building the Generative Data Loop for Embodied AI.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-sm">导航</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary">首页</Link></li>
            <li><Link href="/research" className="hover:text-primary">核心研究</Link></li>
            <li><Link href="/team" className="hover:text-primary">团队成员</Link></li>
            <li><Link href="/about" className="hover:text-primary">关于我们</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-sm">联系方式</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>西湖大学工学院</li>
            <li>浙江省杭州市西湖区墩余路600号</li>
            <li>autolab.hr@westlake.edu.cn</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Westlake Data Intelligence. All rights reserved.
      </div>
    </footer>
  );
}

