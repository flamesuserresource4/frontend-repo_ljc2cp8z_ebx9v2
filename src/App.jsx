import { useMemo, useState } from 'react'
import {
  BookOpen,
  Sparkles,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from 'lucide-react'

const LEVELS = [
  { key: 'A1', label: 'A1', desc: 'Beginner' },
  { key: 'A2', label: 'A2', desc: 'Elementary' },
  { key: 'B1', label: 'B1', desc: 'Intermediate' },
  { key: 'B2', label: 'B2', desc: 'Upper Intermediate' },
]

const TOPICS = ['Travel', 'Technology', 'Business', 'Lifestyle', 'Health']

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

function App() {
  const [step, setStep] = useState(1) // 1: Onboarding, 2: Reading, 3: Quiz, 4: Results
  const [level, setLevel] = useState(null)
  const [topics, setTopics] = useState([])
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

  const primaryTopic = topics[0]

  const toggleTopic = (t) => {
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-slate-800">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-sky-100 p-2 text-sky-600 shadow-sm"><GraduationCap className="h-6 w-6" /></div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">English Reader</h1>
              <p className="text-sm text-slate-500">Personalized reading, simple practice</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sky-600">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm">Learn by reading</span>
          </div>
        </header>

        {/* Card Container */}
        <div className="rounded-2xl bg-white/80 shadow-xl ring-1 ring-black/5 backdrop-blur-sm">
          {/* Onboarding */}
          {step === 1 && (
            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-emerald-600" />
                <h2 className="text-lg font-semibold">Choose your level and topics</h2>
              </div>

              {/* Levels */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {LEVELS.map((l) => {
                  const active = level === l.key
                  return (
                    <button
                      key={l.key}
                      onClick={() => setLevel(l.key)}
                      className={`group rounded-xl border p-4 text-left transition shadow-sm hover:shadow-md ${
                        active
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className={`mb-2 inline-flex items-center rounded-lg px-2 py-1 text-xs ${
                        active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {l.desc}
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold tracking-tight">{l.label}</span>
                        <span className={`text-xs ${active ? 'text-emerald-600' : 'text-slate-400'}`}>CEFR</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Topics */}
              <div className="mt-8">
                <p className="mb-3 text-sm font-medium text-slate-600">Pick one or more topics</p>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => {
                    const active = topics.includes(t)
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => toggleTopic(t)}
                        className={`rounded-full border px-4 py-2 text-sm transition ${
                          active
                            ? 'border-sky-300 bg-sky-50 text-sky-700 shadow-sm'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="text-xs text-slate-500">Soft colors, clean layout, focused reading</div>
                <button
                  onClick={startLearning}
                  disabled={!level || topics.length === 0 || loading}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    !level || topics.length === 0 || loading
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-sky-600 text-white hover:bg-sky-700 shadow-sm'
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
                </button>
              </div>
            </div>
          )}

          {/* Reading */}
          {step === 2 && (
            <div className="p-6 md:p-10">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">Level {level}</span>
                  {primaryTopic && (
                    <span className="rounded-lg bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">{primaryTopic}</span>
                  )}
                </div>
                <div className="text-sm text-slate-500">Approx. 180 words</div>
              </div>

              <article className="prose prose-slate max-w-none">
                <h2 className="mb-4 font-semibold tracking-tight text-slate-800">Community Garden Morning</h2>
                <div className="rounded-2xl bg-slate-50/80 p-6 ring-1 ring-slate-200">
                  <p className="font-serif text-lg leading-8 text-slate-800">{PASSAGE}</p>
                </div>
              </article>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  Take Quiz
                  <ArrowRight className="h-4 w-4" />
                </button>
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
                  <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${progressValue}%` }} />
                </div>
              </div>

              <div className="space-y-5">
                {QUESTIONS.map((q, idx) => {
                  const selected = answers[q.id]
                  const isCorrect = submitted && selected === q.answerIndex
                  const isWrong = submitted && selected !== undefined && selected !== q.answerIndex

                  return (
                    <div
                      key={q.id}
                      className={`rounded-xl border p-4 shadow-sm transition ${
                        isCorrect
                          ? 'border-emerald-300 bg-emerald-50'
                          : isWrong
                          ? 'border-rose-300 bg-rose-50'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <p className="font-medium text-slate-800">{idx + 1}. {q.question}</p>
                        {submitted && (
                          isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-rose-500" />
                          )
                        )}
                      </div>

                      <div className="grid gap-2 sm:grid-cols-2">
                        {q.options.map((opt, i) => {
                          const active = selected === i
                          const correctChoice = submitted && i === q.answerIndex
                          const wrongChoice = submitted && active && i !== q.answerIndex

                          return (
                            <button
                              key={i}
                              onClick={() => !submitted && setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                              className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                                correctChoice
                                  ? 'border-emerald-400 bg-emerald-50'
                                  : wrongChoice
                                  ? 'border-rose-400 bg-rose-50'
                                  : active
                                  ? 'border-sky-300 bg-sky-50'
                                  : 'border-slate-200 bg-white hover:bg-slate-50'
                              }`}
                            >
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                {!submitted ? (
                  <p className="text-sm text-slate-500">Select one answer for each question, then submit to see feedback.</p>
                ) : (
                  <p className="text-sm font-medium text-slate-700">Score: {score}/{QUESTIONS.length}</p>
                )}

                <div className="flex gap-3">
                  {!submitted ? (
                    <button
                      onClick={() => setSubmitted(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      Submit Answers
                    </button>
                  ) : (
                    <button
                      onClick={() => setStep(4)}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      View Results
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {step === 4 && (
            <div className="p-6 md:p-10">
              <div className="mb-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 p-6 ring-1 ring-black/5">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                  <Sparkles className="h-4 w-4" />
                  Great job!
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-800">You scored {score} out of {QUESTIONS.length}</h3>
                <p className="mt-1 text-sm text-slate-600">Level {level} • {primaryTopic || 'General'}</p>
              </div>

              <div>
                <h4 className="mb-3 text-base font-semibold text-slate-800">Key Vocabulary</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  {VOCAB.map((v) => (
                    <div key={v.word} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="font-semibold text-slate-800">{v.word}</p>
                      <p className="text-sm text-slate-600">{v.def}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <p className="text-sm text-slate-500">Want to explore another topic or level?</p>
                <button
                  onClick={resetAll}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Another Topic
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="mx-auto mt-6 max-w-4xl text-center text-xs text-slate-500">
          Designed with soft colors, rounded corners, and generous whitespace for calm learning.
        </div>
      </div>
    </div>
  )
}

export default App
