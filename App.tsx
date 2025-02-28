import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Rocket, Shield, Zap, ArrowRight } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from './components/ui/dialog'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { useToast } from './hooks/use-toast'
import { Toaster } from './components/ui/toaster'

function App() {
  const [showWaitingList, setShowWaitingList] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  })
  const { toast } = useToast()
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to a backend
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      description: ''
    })
    // Close dialog
    setShowWaitingList(false)
    // Show success message
    toast({
      title: "提交成功！",
      description: "感谢您的兴趣，我们会尽快与您联系。",
    })
  }
  
  const features = [
    {
      icon: <Rocket className="h-6 w-6 text-primary" />,
      title: "快速启动",
      description: "我们的平台让您能够快速启动项目，无需复杂的设置过程。"
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "安全可靠",
      description: "我们优先考虑您的数据安全，采用最先进的加密技术保护您的信息。"
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "高效协作",
      description: "我们的工具专为团队协作而设计，提高生产力和沟通效率。"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-primary/5 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary">
              创新解决方案，改变您的工作方式
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              我们的平台提供直观的工具，帮助您更高效地完成工作，释放创造力。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button 
                size="lg" 
                onClick={() => setShowWaitingList(true)}
                className="gap-2"
              >
                加入等待名单 <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">了解更多</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter">
              我们的核心价值
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              我们致力于提供最佳的用户体验和解决方案，以下是我们的核心价值观。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-4">
            准备好开始了吗？
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            我们正在开发中，很快就会推出。现在加入等待名单，成为第一批体验我们平台的用户。
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowWaitingList(true)}
            className="gap-2"
          >
            加入等待名单 <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 md:h-24">
          <p className="text-sm text-muted-foreground">
            © 2025 我们的平台。保留所有权利。
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">隐私政策</Button>
            <Button variant="ghost" size="sm">使用条款</Button>
          </div>
        </div>
      </footer>
      
      {/* Waiting List Dialog */}
      <Dialog open={showWaitingList} onOpenChange={setShowWaitingList}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>加入等待名单</DialogTitle>
            <DialogDescription>
              填写以下信息加入我们的等待名单，成为第一批体验我们平台的用户。
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="请输入您的姓名"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">电子邮箱</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="请输入您的电子邮箱"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">您对我们平台的期望</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="请告诉我们您对我们平台的期望或您希望解决的问题"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-24"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">取消</Button>
              </DialogClose>
              <Button type="submit">提交</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Toaster />
    </div>
  )
}

export default App
