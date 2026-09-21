"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"

const GRID_SIZE = 20
const CANVAS_SIZE = 400
const STORAGE_KEY = "snake_game_highscore"

type GameState = "start" | "playing" | "paused" | "gameover"

interface Point {
  x: number
  y: number
}

const COLORS = {
  head: "#00ff88",
  food: "#ff6b6b",
  grid: "#333344",
  bg: "#16182e",
  eye: "#16182e",
}

const DIRECTIONS: Record<string, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

const OPPOSITES: Record<string, string> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [gameState, setGameStateRaw] = useState<GameState>("start")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isNewRecord, setIsNewRecord] = useState(false)

  // —— 可变游戏数据（不触发重渲染）——
  const snakeRef = useRef<Point[]>([])
  const foodRef = useRef<Point>({ x: 10, y: 10 })
  const directionRef = useRef("right")
  const nextDirectionRef = useRef("right")
  const gameSpeedRef = useRef(150)
  const lastRenderRef = useRef(0)
  const rafRef = useRef(0)
  const stateRef = useRef<GameState>("start")

  const setGameState = (next: GameState) => {
    stateRef.current = next
    setGameStateRaw(next)
  }

  const loadHighScore = (): number => {
    if (typeof window === "undefined") return 0
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? parseInt(stored, 10) || 0 : 0
  }

  // 初始加载最高分 + 绘制首帧 + 响应式尺寸
  useEffect(() => {
    setHighScore(loadHighScore())
    resizeCanvas()
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) draw(ctx, 0)
    }
    window.addEventListener("resize", resizeCanvas)
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return
    const maxSize = Math.min(window.innerWidth - 40, window.innerHeight - 180, CANVAS_SIZE)
    const size = Math.floor(maxSize / GRID_SIZE) * GRID_SIZE
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
  }

  const generateFood = () => {
    let valid = false
    let pos: Point = { x: 0, y: 0 }
    while (!valid) {
      pos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
      valid = !snakeRef.current.some((s) => s.x === pos.x && s.y === pos.y)
    }
    foodRef.current = pos
  }

  const initGame = () => {
    const startX = Math.floor(GRID_SIZE / 4)
    const startY = Math.floor(GRID_SIZE / 2)
    snakeRef.current = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ]
    directionRef.current = "right"
    nextDirectionRef.current = "right"
    gameSpeedRef.current = 150
    setScore(0)
    setIsNewRecord(false)
    generateFood()
  }

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = COLORS.grid
    ctx.lineWidth = 0.5
    const step = CANVAS_SIZE / GRID_SIZE
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * step, 0)
      ctx.lineTo(i * step, CANVAS_SIZE)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * step)
      ctx.lineTo(CANVAS_SIZE, i * step)
      ctx.stroke()
    }
  }

  const drawFood = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    const pulse = 1 + Math.sin(timestamp / 200) * 0.1
    const step = CANVAS_SIZE / GRID_SIZE
    const x = foodRef.current.x * step + step / 2
    const y = foodRef.current.y * step + step / 2
    const radius = (step / 2 - 3) * pulse

    ctx.shadowColor = COLORS.food
    ctx.shadowBlur = 15
    ctx.fillStyle = COLORS.food
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    ctx.fillStyle = "rgba(255,255,255,0.3)"
    ctx.beginPath()
    ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.3, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawSnake = (ctx: CanvasRenderingContext2D) => {
    const step = CANVAS_SIZE / GRID_SIZE
    snakeRef.current.forEach((segment, index) => {
      const x = segment.x * step
      const y = segment.y * step
      const padding = 2
      const progress = index / snakeRef.current.length
      const g = Math.floor(255 - progress * 80)
      const b = Math.floor(136 - progress * 40)

      ctx.fillStyle = `rgb(0, ${g}, ${b})`

      if (index === 0) {
        ctx.shadowColor = COLORS.head
        ctx.shadowBlur = 10
      } else {
        ctx.shadowBlur = 0
      }

      ctx.beginPath()
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(x + padding, y + padding, step - padding * 2, step - padding * 2, 4)
      } else {
        ctx.rect(x + padding, y + padding, step - padding * 2, step - padding * 2)
      }
      ctx.fill()
      ctx.shadowBlur = 0

      // 蛇头眼睛
      if (index === 0) {
        const eyeSize = 3
        const eyeOffset = 5
        const dir = directionRef.current
        let eyes: Point[] = []
        if (dir === "right") {
          eyes = [
            { x: x + step - eyeOffset - eyeSize, y: y + eyeOffset },
            { x: x + step - eyeOffset - eyeSize, y: y + step - eyeOffset - eyeSize },
          ]
        } else if (dir === "left") {
          eyes = [
            { x: x + eyeOffset, y: y + eyeOffset },
            { x: x + eyeOffset, y: y + step - eyeOffset - eyeSize },
          ]
        } else if (dir === "up") {
          eyes = [
            { x: x + eyeOffset, y: y + eyeOffset },
            { x: x + step - eyeOffset - eyeSize, y: y + eyeOffset },
          ]
        } else {
          eyes = [
            { x: x + eyeOffset, y: y + step - eyeOffset - eyeSize },
            { x: x + step - eyeOffset - eyeSize, y: y + step - eyeOffset - eyeSize },
          ]
        }
        ctx.fillStyle = COLORS.eye
        eyes.forEach((e) => {
          ctx.beginPath()
          ctx.arc(e.x + eyeSize / 2, e.y + eyeSize / 2, eyeSize, 0, Math.PI * 2)
          ctx.fill()
        })
      }
    })
  }

  const draw = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    ctx.fillStyle = COLORS.bg
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    drawGrid(ctx)
    drawFood(ctx, timestamp)
    drawSnake(ctx)
  }

  const update = () => {
    directionRef.current = nextDirectionRef.current
    const head = { ...snakeRef.current[0] }
    const vec = DIRECTIONS[directionRef.current]
    head.x += vec.x
    head.y += vec.y

    // 撞墙
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      gameOver()
      return
    }
    // 撞自己
    if (snakeRef.current.some((s) => s.x === head.x && s.y === head.y)) {
      gameOver()
      return
    }

    snakeRef.current.unshift(head)
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      const next = score + 10
      setScore(next)
      if (next > loadHighScore()) {
        setIsNewRecord(true)
        setHighScore(next)
        window.localStorage.setItem(STORAGE_KEY, next.toString())
      }
      generateFood()
      gameSpeedRef.current = Math.max(80, gameSpeedRef.current - 2)
    } else {
      snakeRef.current.pop()
    }
  }

  const gameLoop = (timestamp: number) => {
    if (stateRef.current !== "playing") return
    if (timestamp - lastRenderRef.current >= gameSpeedRef.current) {
      update()
      lastRenderRef.current = timestamp
    }
    if (stateRef.current === "playing") {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (ctx) draw(ctx, timestamp)
      rafRef.current = requestAnimationFrame(gameLoop)
    }
  }

  const startGame = () => {
    initGame()
    setGameState("playing")
    lastRenderRef.current = 0
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(gameLoop)
  }

  const pauseGame = () => {
    if (stateRef.current === "playing") {
      setGameState("paused")
      cancelAnimationFrame(rafRef.current)
    }
  }

  const resumeGame = () => {
    if (stateRef.current === "paused") {
      setGameState("playing")
      lastRenderRef.current = 0
      rafRef.current = requestAnimationFrame(gameLoop)
    }
  }

  const gameOver = () => {
    setGameState("gameover")
    cancelAnimationFrame(rafRef.current)
  }

  const setDirection = (newDir: string) => {
    if (OPPOSITES[newDir] !== directionRef.current) {
      nextDirectionRef.current = newDir
    }
  }

  // 键盘控制
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          e.preventDefault()
          if (stateRef.current === "playing") {
            setDirection(e.key.slice(5).toLowerCase())
          }
          break
        case " ":
          e.preventDefault()
          if (stateRef.current === "playing") pauseGame()
          else if (stateRef.current === "paused") resumeGame()
          else if (stateRef.current === "start") startGame()
          break
        case "Enter":
          e.preventDefault()
          if (stateRef.current === "gameover" || stateRef.current === "start") startGame()
          break
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 卸载时清理动画帧
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleDir = (dir: string) => {
    if (stateRef.current === "playing") setDirection(dir)
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-[460px]">
      {/* 分数面板 */}
      <div className="flex justify-between w-full max-w-[400px] px-1 font-mono text-[13px] text-white">
        <div>
          分数 <span className="text-[#ffd93d] ml-1">{score}</span>
        </div>
        <div>
          最高 <span className="text-[#ffd93d] ml-1">{highScore}</span>
        </div>
      </div>

      {/* 画布 */}
      <div ref={wrapperRef} className="relative rounded-xl border-4 border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.3)] w-full">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="block bg-[#16182e] rounded-lg w-full"
        />

        {/* 开始遮罩 */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-6 rounded-lg bg-black/85 transition-opacity duration-300 ${
            gameState === "start" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <h1 className="font-mono text-2xl md:text-3xl text-[#00ff88] [text-shadow:0_0_10px_#00ff88]">贪吃蛇</h1>
          <p className="font-mono text-xs text-[#ffd93d]">最高分: {highScore}</p>
          <button
            onClick={startGame}
            className="flex items-center gap-2 font-mono text-sm px-8 py-4 bg-transparent text-[#00ff88] border-[3px] border-[#00ff88] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#00ff88]/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4" />
            开始游戏
          </button>
          <p className="font-mono hidden md:block text-[9px] text-[#666] text-center leading-5">
            方向键移动 · 空格暂停 · 回车重新开始
          </p>
        </div>

        {/* 暂停遮罩 */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-6 rounded-lg bg-black/85 transition-opacity duration-300 ${
            gameState === "paused" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <h2 className="font-mono text-lg text-[#ff6b6b] [text-shadow:0_0_10px_#ff6b6b]">游戏暂停</h2>
          <button
            onClick={resumeGame}
            className="flex items-center gap-2 font-mono text-sm px-8 py-4 bg-transparent text-[#00ff88] border-[3px] border-[#00ff88] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#00ff88]/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]"
          >
            <Play className="w-4 h-4" />
            继续
          </button>
        </div>

        {/* 游戏结束遮罩 */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-lg bg-black/85 transition-opacity duration-300 ${
            gameState === "gameover" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <h2 className="font-mono text-lg md:text-xl text-[#ff6b6b] [text-shadow:0_0_10px_#ff6b6b]">游戏结束</h2>
          <p className="font-mono text-sm text-white">得分: {score}</p>
          {isNewRecord && (
            <p className="font-mono text-xs text-[#ff6b6b] animate-pulse">新纪录!</p>
          )}
          <p className="font-mono text-xs text-[#ffd93d]">最高分: {highScore}</p>
          <button
            onClick={startGame}
            className="flex items-center gap-2 font-mono text-sm px-8 py-4 bg-transparent text-[#00ff88] border-[3px] border-[#00ff88] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#00ff88]/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]"
          >
            <RotateCcw className="w-4 h-4" />
            再来一次
          </button>
        </div>
      </div>

      {/* 移动端虚拟方向键 */}
      <div className="grid grid-cols-3 gap-2 md:hidden" style={{ gridTemplateRows: "repeat(3, 48px)", gridTemplateColumns: "repeat(3, 48px)" }}>
        <div />
        <button
          aria-label="向上"
          onPointerDown={() => handleDir("up")}
          className="w-12 h-12 bg-[#00ff88]/20 border-2 border-[#00ff88] rounded-lg text-[#00ff88] text-xl active:bg-[#00ff88]/50 active:scale-95 transition-all"
        >
          ▲
        </button>
        <div />
        <button
          aria-label="向左"
          onPointerDown={() => handleDir("left")}
          className="w-12 h-12 bg-[#00ff88]/20 border-2 border-[#00ff88] rounded-lg text-[#00ff88] text-xl active:bg-[#00ff88]/50 active:scale-95 transition-all"
        >
          ◀
        </button>
        <button
          aria-label="暂停/继续"
          onPointerDown={() =>
            stateRef.current === "playing" ? pauseGame() : stateRef.current === "paused" ? resumeGame() : startGame()
          }
          className="w-12 h-12 bg-[#00ff88]/20 border-2 border-[#00ff88] rounded-lg text-[#00ff88] text-sm active:bg-[#00ff88]/50 active:scale-95 transition-all"
        >
          <Pause className="w-4 h-4 mx-auto" />
        </button>
        <button
          aria-label="向右"
          onPointerDown={() => handleDir("right")}
          className="w-12 h-12 bg-[#00ff88]/20 border-2 border-[#00ff88] rounded-lg text-[#00ff88] text-xl active:bg-[#00ff88]/50 active:scale-95 transition-all"
        >
          ▶
        </button>
        <div />
        <button
          aria-label="向下"
          onPointerDown={() => handleDir("down")}
          className="w-12 h-12 bg-[#00ff88]/20 border-2 border-[#00ff88] rounded-lg text-[#00ff88] text-xl active:bg-[#00ff88]/50 active:scale-95 transition-all"
        >
          ▼
        </button>
        <div />
      </div>
    </div>
  )
}