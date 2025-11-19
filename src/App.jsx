import { useMemo, useState } from 'react'
import {
  BookOpen,
  Sparkles,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Sprout,
  Compass,
  Target,
  Rocket,
  Plane,
  Cpu,
  Briefcase,
  Heart,
  Sun,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const LEVELS = [
  { key: 'A1', label: 'A1', desc: 'Beginner', Icon: Sprout },
  { key: 'A2', label: 'A2', desc: 'Elementary', Icon: Compass },
  { key: 'B1', label: 'B1', desc: 'Intermediate', Icon: Target },
  { key: 'B2', label: 'B2', desc: 'Upper Intermediate', Icon: Rocket },
]

// Topic definitions with icons
const TOPIC_DEFS = [
  { key: 'travel', label: 'Travel', Icon: Plane },
  { key: 'technology', label: 'Technology', Icon: Cpu },
  { key: 'business', label: 'Business', Icon: Briefcase },
  { key: 'lifestyle', label: 'Lifestyle', Icon: Sun },
  { key: 'health', label: 'Health', Icon: Heart },
]

const PASSAGE = `On a quiet Sunday morning, Mia decided to take a walk through the old neighborhood park. The air was cool, and the leaves moved softly in the wind. She noticed a small sign near the entrance that said, “Community Garden—Volunteers Welcome.” Curious, she followed the path and found a group of people planting herbs and vegetables. A friendly woman handed Mia a pair of gloves and asked if she wanted to help. Mia smiled and joined them.

As they worked, Mia learned the names of new plants and the best time to water them. She was surprised to hear how the garden was shared by many families, who took turns caring for it and enjoyed the fresh food together. A retired teacher taught children how to compost, and a local chef gave tips on cooking healthy meals. By the time the sun was high, Mia felt calm and proud. She realized that small actions—like planting a seed—could make a real difference. Before leaving, she signed her name on the volunteer board and promised to return next week.`

const QUESTIONS = [
  {
    id: 1,
    type: 'vocab',
    question: 'What does the word “volunteer” most closely mean in the passage?',
    options: ['A person who is paid to work', 'A person who helps by choice', 'A person who owns the garden', 'A person who visits once'],
    answerIndex: 1,
  },
  {
    id: 2,
    type: 'comprehension',
    question: 'Why did Mia feel calm and proud at the end?',
    options: [
      'She became the garden manager',
      'She learned to cook new meals',
      'She helped with the garden and learned new things',
      'She won a prize for planting the fastest',
    ],
    answerIndex: 2,
  },
  {
    id: 3,
    type: 'vocab',
    question: 'In the phrase “make a real difference,” “difference” is closest to:',
    options: ['Change or positive effect', 'Argument with someone', 'Exact measurement', 'A difficult choice'],
    answerIndex: 0,
  },
  {
    id: 4,
    type: 'comprehension',
    question: 'Who taught children how to compost?',
    options: ['A friendly woman', 'A retired teacher', 'A local chef', 'Mia'],
    answerIndex: 1,
  },
  {
    id: 5,
    type: 'comprehension',
    question: 'What did Mia do before she left the garden?',
    options: [
      'She took vegetables home',
      'She signed up to return and help again',
      'She bought new gardening tools',
      'She wrote a letter to the manager',
    ],
    answerIndex: 1,
  },
]

const VOCAB = [
  { word: 'Volunteer', def: 'A person who offers to help without payment.' },
  { word: 'Compost', def: 'Recycled organic material used to enrich soil.' },
  { word: 'Herbs', def: 'Plants used for flavor, smell, or medicine.' },
  { word: 'Curious', def: 'Interested in learning or knowing about something.' },
  { word: 'Shared', def: 'Used or enjoyed by a group of people.' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
}

function App() {
  const [step, setStep] = useState(1) // 1: Onboarding, 2: Reading, 3: Quiz, 4: Results
  const [level, setLevel] = useState(null)
  const [topics, setTopics] = useState([]) // stores topic keys
  const [loading, setLoading] = useState(false)

  const [answers, setAnswers] = useState({}) // { [q.id]: index }
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    if (!submitted) return 0
    return QUESTIONS.reduce((acc, q) => (answers[q.id] === q.answerIndex ? acc + 1 : acc), 0)
  }, [answers, submitted])

  const progressValue = useMemo(() => {
    const answered = Object.keys(answers).length
    return Math.round((answered / QUESTIONS.length) * 100)
  }, [answers])

  const primaryTopicKey = topics[0]
  const primaryTopicLabel = TOPIC_DEFS.find((t) => t.key === primaryTopicKey)?.label

  const toggleTopic = (key) => {
    setTopics((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]))
  }

  const startLearning = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(2)
    }, 900)
  }

  const resetAll = () => {
    setStep(1)
    setLevel(null)
    setTopics([])
    setAnswers({})
    setSubmitted(false)
    setLoading(false)
  }

  // Gradient tokens
  const primaryGradient = 'bg-gradient-to-br from-[#FF8C66] to-[#3ECFBF]'
  const secondaryGradient = 'bg-gradient-to-br from-[#3ECFBF] to-[#FF8C66]'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-3">
            <div className={`rounded-2xl p-2 text-white shadow-[0_10px_30px_rgba(62,207,191,0.25)] ${secondaryGradient}`}><GraduationCap className="h-6 w-6" /></div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">English Reader</h1>
              <p className="text-sm text-slate-500">Personalized reading, simple practice</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="hidden md:flex items-center gap-2 text-slate-600">
            <div className={`rounded-full p-1.5 text-white ${secondaryGradient}`}>
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-sm">Learn by reading</span>
          </motion.div>
        </header>

        {/* Card Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl bg-white shadow-md ring-1 ring-black/5"
          >
            {/* Onboarding */}
            {step === 1 && (
              <div className="p-6 md:p-8">
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-6 flex items-center gap-3">
                  <div className={`rounded-xl p-1.5 text-white ${secondaryGradient}`}>
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800">Choose your level and topics</h2>
                </motion.div>

                {/* Levels */}
                <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {LEVELS.map((l) => {
                    const active = level === l.key
                    const Icon = l.Icon

                    return (
                      <motion.button
                        variants={item}
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        key={l.key}
                        onClick={() => setLevel(l.key)}
                        className={
                          active
                            ? `group rounded-2xl p-[2px] shadow-[0_10px_30px_rgba(255,140,102,0.18)] ${primaryGradient}`
                            : 'group rounded-2xl border border-slate-200 bg-white p-0 shadow-sm hover:shadow-md'
                        }
                      >
                        <div className={`rounded-2xl bg-white p-4 ${active ? 'ring-1 ring-white/60' : ''}`}>
                          <div className="mb-3 flex items-center justify-between">
                            <div className={`inline-flex items-center gap-2 rounded-xl p-2 text-white ${secondaryGradient}`}>
                              <Icon className="h-4 w-4" />
                              <span className="text-xs font-medium">{l.desc}</span>
                            </div>
                            <span className={`text-xs ${active ? 'text-slate-700' : 'text-slate-400'}`}>CEFR</span>
                          </div>
                          <div className="flex items-end justify-between">
                            <span className="text-2xl font-bold tracking-tight text-slate-800">{l.label}</span>
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </motion.div>

                {/* Topics */}
                <div className="mt-8">
                  <p className="mb-3 text-sm font-medium text-slate-600">Pick one or more topics</p>
                  <motion.div variants={container} initial="hidden" animate="show" className="flex flex-wrap gap-2">
                    {TOPIC_DEFS.map(({ key, label, Icon }) => {
                      const active = topics.includes(key)
                      return (
                        <motion.button
                          variants={item}
                          whileHover={{ y: -1, scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          key={key}
                          onClick={() => toggleTopic(key)}
                          className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                            active
                              ? `${secondaryGradient} text-white border-transparent shadow-md`
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span
                            className={`grid h-5 w-5 place-items-center rounded-full ${
                              active ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          {label}
                        </motion.button>
                      )
                    })}
                  </motion.div>
                </div>

                {/* Action */}
                <div className="mt-8 flex items-center justify-end gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startLearning}
                    disabled={!level || topics.length === 0 || loading}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition focus:outline-none ${
                      !level || topics.length === 0 || loading
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : `${primaryGradient} shadow-[0_10px_28px_rgba(255,140,102,0.22)]`
                    }`}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Start Learning
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            )}

            {/* Reading */}
            {step === 2 && (
              <div className="p-6 md:p-10">
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600">Level {level}</span>
                    {primaryTopicLabel && (
                      <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-600">{primaryTopicLabel}</span>
                    )}
                  </div>
                  <div className="text-sm text-slate-500">Approx. 180 words</div>
                </motion.div>

                <article className="prose prose-slate max-w-none">
                  <motion.h2 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-4 font-semibold tracking-tight text-slate-800">Community Garden Morning</motion.h2>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 shadow-sm">
                    <p className="font-serif text-lg leading-8 text-slate-800">{PASSAGE}</p>
                  </motion.div>
                </article>

                <div className="mt-8 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(3)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition ${primaryGradient} shadow-[0_10px_28px_rgba(62,207,191,0.22)]`}
                  >
                    Take Quiz
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Quiz */}
            {step === 3 && (
              <div className="p-6 md:p-8">
                {/* Progress */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">Quiz</span>
                    <span className="text-slate-500">{Object.keys(answers).length}/{QUESTIONS.length} answered</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <motion.div
                      initial={false}
                      animate={{ width: `${progressValue}%` }}
                      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                      className={`h-full rounded-full ${primaryGradient}`}
                    />
                  </div>
                </div>

                <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
                  {QUESTIONS.map((q, idx) => {
                    const selected = answers[q.id]
                    const isCorrect = submitted && selected === q.answerIndex
                    const isWrong = submitted && selected !== undefined && selected !== q.answerIndex

                    return (
                      <motion.div
                        variants={item}
                        key={q.id}
                        className={`rounded-2xl border p-4 shadow-sm transition ${
                          isCorrect
                            ? 'border-teal-300 bg-teal-50'
                            : isWrong
                            ? 'border-orange-300 bg-orange-50'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <p className="font-medium text-slate-800">{idx + 1}. {q.question}</p>
                          {submitted && (
                            isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 text-teal-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-orange-500" />
                            )
                          )}
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                          {q.options.map((opt, i) => {
                            const active = selected === i
                            const correctChoice = submitted && i === q.answerIndex
                            const wrongChoice = submitted && active && i !== q.answerIndex

                            return (
                              <motion.button
                                whileHover={!submitted ? { scale: 1.01 } : {}}
                                whileTap={!submitted ? { scale: 0.98 } : {}}
                                key={i}
                                onClick={() => !submitted && setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                                  correctChoice
                                    ? 'border-teal-400 bg-teal-50'
                                    : wrongChoice
                                    ? 'border-orange-400 bg-orange-50'
                                    : active
                                    ? 'border-orange-300 bg-orange-50'
                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                }`}
                              >
                                {opt}
                              </motion.button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>

                <div className="mt-6 flex items-center justify-between">
                  {!submitted ? (
                    <p className="text-sm text-slate-500">Select one answer for each question, then submit to see feedback.</p>
                  ) : (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium text-slate-700">Score: {score}/{QUESTIONS.length}</motion.p>
                  )}

                  <div className="flex gap-3">
                    {!submitted ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSubmitted(true)}
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition ${primaryGradient} shadow-[0_10px_28px_rgba(255,140,102,0.22)]`}
                      >
                        Submit Answers
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(4)}
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition ${primaryGradient} shadow-[0_10px_28px_rgba(62,207,191,0.22)]`}
                      >
                        View Results
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {step === 4 && (
              <div className="p-6 md:p-10">
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }} className={`mb-8 rounded-3xl p-6 ring-1 ring-black/5 text-slate-800 ${secondaryGradient} bg-opacity-10`}> 
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-teal-700 ring-1 ring-white/50">
                    <Sparkles className="h-4 w-4" />
                    Great job!
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">You scored {score} out of {QUESTIONS.length}</h3>
                  <p className="mt-1 text-sm text-slate-700">Level {level} • {primaryTopicLabel || 'General'}</p>
                </motion.div>

                <div>
                  <h4 className="mb-3 text-base font-semibold text-slate-800">Key Vocabulary</h4>
                  <motion.div variants={container} initial="hidden" animate="show" className="grid gap-3 md:grid-cols-2">
                    {VOCAB.map((v) => (
                      <motion.div variants={item} key={v.word} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="font-semibold text-slate-800">{v.word}</p>
                        <p className="text-sm text-slate-600">{v.def}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <p className="text-sm text-slate-500">Want to explore another topic or level?</p>
                  <motion.button
                    whileHover={{ rotate: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98, rotate: 0 }}
                    onClick={resetAll}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition ${secondaryGradient} shadow-[0_10px_28px_rgba(62,207,191,0.22)]`}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Another Topic
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
