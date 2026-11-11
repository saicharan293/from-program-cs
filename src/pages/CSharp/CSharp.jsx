
import { Link } from 'react-router-dom'
import './CSharp.css'

function CSharp() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="note-header">
        <div className="container">
          <p className="eyebrow">01 · C#</p>

          <h1>Where I started.</h1>

          <p className="note-intro">
            I initially thought I just needed to learn the fundamentals
            of C#. But that turned out to be the beginning of a much
            bigger journey.
          </p>
        </div>
      </section>

      {/* STORY CONTENT */}
      <section className="note-content">
        <div className="container">
          <article className="note-story csharp-story">

            <h2>What I wanted to learn</h2>

            <p>
              My initial goal was simple: understand C# fundamentals.
            </p>

            <p>
              I started exploring concepts such as variables, methods,
              classes, object-oriented programming and collections.
            </p>

            <h2>Then something changed</h2>

            <p>
              While working on an application, I came across a file
              called <code>Program.cs</code>.
            </p>

            <p>
              I could understand some of the C# syntax, but I couldn't
              explain everything that was happening there.
            </p>

            {/* THE QUESTION */}
            <div className="question-box">
              <p className="eyebrow">THE QUESTION</p>

              <h3>
                What exactly is happening inside Program.cs?
              </h3>
            </div>

            <h2>What this led to</h2>

            <p>
              Instead of ignoring the question, I started digging.
            </p>

            <p>
              That investigation led me to a distinction I hadn't
              understood before: C# was the language I was writing,
              but .NET was the platform around it.
            </p>

            <p>
              That opened the door to a much deeper question:
            </p>

            {/* NEXT QUESTION */}
            <div className="question-box">
              <p className="eyebrow">NEXT QUESTION</p>

              <h3>
                If C# is the language, what exactly is .NET?
              </h3>

              <Link to="/dotnet" className="read-link">
                Continue to .NET →
              </Link>
            </div>

          </article>
        </div>
      </section>
    </>
  )
}

export default CSharp
