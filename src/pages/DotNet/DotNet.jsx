
import { Link } from 'react-router-dom'
import './DotNet.css'

function DotNet() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="note-header">
        <div className="container">
          <p className="eyebrow">JOURNEY · 03</p>

          <h1>So, what exactly is .NET?</h1>

          <p className="note-intro">
            I started with C#. Then I realized that understanding
            the language alone wasn't enough to understand the
            application I was working on.
          </p>
        </div>
      </section>

      {/* STORY CONTENT */}
      <section className="note-content">
        <div className="container">
          <article className="note-story">

            {/* 01 - THE QUESTION */}
            <div className="story-block">
              <span className="story-number">01</span>

              <p className="eyebrow">THE QUESTION</p>

              <h2>I knew C#. But where does .NET fit?</h2>

              <p>
                I initially thought learning C# would be enough
                to understand the technology behind the application.
              </p>

              <p>
                But while looking at <code>Program.cs</code>,
                I started noticing things that weren't really
                explained by C# alone.
              </p>

              <p>That led me to a simple question:</p>

              <blockquote>
                What exactly is .NET?
              </blockquote>
            </div>

            {/* 02 - BEFORE .NET */}
            <div className="story-block">
              <span className="story-number">02</span>

              <p className="eyebrow">BEFORE .NET</p>

              <h2>
                Application development was more fragmented.
              </h2>

              <p>
                Before .NET, Microsoft had several technologies
                and programming models for building different
                kinds of applications.
              </p>

              <p>
                These technologies evolved around different needs
                and environments, which made the overall
                development landscape more fragmented.
              </p>

              <p>
                Microsoft saw an opportunity to provide a more
                unified programming model and common foundation
                for application development.
              </p>
            </div>

            {/* 03 - THE PROBLEM */}
            <div className="story-block highlight-block">
              <span className="story-number">03</span>

              <p className="eyebrow">THE PROBLEM</p>

              <h2>Microsoft wanted a common platform.</h2>

              <p>
                The problem wasn't that developers couldn't
                build applications.
              </p>

              <p>
                Microsoft wanted developers to have a common
                programming environment and set of services
                that could be used across different kinds
                of applications.
              </p>

              <p>
                The idea was that languages such as C# could
                work with the same underlying runtime and
                libraries instead of each language needing
                completely separate infrastructure.
              </p>

              <div className="story-diagram">
                <div>C#</div>

                <div>Visual Basic</div>

                <div>Other .NET languages</div>

                <span>↓</span>

                <strong>Common .NET Platform</strong>
              </div>
            </div>

            {/* 04 - THE SOLUTION */}
            <div className="story-block">
              <span className="story-number">04</span>

              <p className="eyebrow">THE SOLUTION</p>

              <h2>.NET</h2>

              <p>
                .NET was Microsoft's answer to this problem:
                a common platform for building and running
                applications.
              </p>

              <p>
                It brought together a runtime, libraries,
                and development tools that applications
                could build upon.
              </p>

              <div className="simple-diagram">
                <div>C#</div>

                <span>↓</span>

                <div>.NET</div>

                <span>↓</span>

                <div>Application</div>
              </div>
            </div>

            {/* 05 - WHAT DID .NET PROVIDE */}
            <div className="story-block">
              <span className="story-number">05</span>

              <p className="eyebrow">WHAT DID .NET PROVIDE?</p>

              <h2>A common set of building blocks.</h2>

              <p>
                I started to understand that .NET wasn't simply
                something that "runs C#".
              </p>

              <p>
                It also provides libraries, runtime services
                and development tools that applications can use.
              </p>

              <pre>
                <code>{'string text = File.ReadAllText("data.txt");'}</code>
              </pre>

              <p>
                C# gives me the language syntax I use to write
                this code. But <code>File.ReadAllText()</code>
                is an API provided by the .NET class libraries.
              </p>

              <p>
                This helped me understand that C# and .NET
                are different pieces working together.
              </p>
            </div>

            {/* 06 - WHERE DOES C# FIT */}
            <div className="story-block">
              <span className="story-number">06</span>

              <p className="eyebrow">WHERE DOES C# FIT?</p>

              <h2>C# and .NET are different things.</h2>

              <p>
                This was one of the first important distinctions
                I had to understand.
              </p>

              <div className="concept-grid">
                <div className="concept-card">
                  <h3>C#</h3>

                  <p>
                    A programming language used to write
                    application code.
                  </p>
                </div>

                <div className="concept-card">
                  <h3>.NET</h3>

                  <p>
                    A development platform that provides
                    the runtime, libraries and tools used
                    to build and run applications.
                  </p>
                </div>
              </div>
            </div>

            {/* 07 - WHAT DID THIS CHANGE */}
            <div className="story-block">
              <span className="story-number">07</span>

              <p className="eyebrow">WHAT DID THIS CHANGE?</p>

              <h2>C# was part of a larger ecosystem.</h2>

              <p>
                I started seeing C# not as the entire technology
                stack, but as one part of an ecosystem built
                around the .NET platform.
              </p>

              <p>
                Developers could write applications using
                languages such as C# while relying on a common
                runtime, libraries and tools provided by .NET.
              </p>

              <p>
                But this answered one question and created another.
              </p>

              <blockquote>
                If .NET provides the platform, why did Microsoft
                eventually create .NET Core?
              </blockquote>
            </div>

            {/* NEXT QUESTION */}
            <div className="next-question">
              <p className="eyebrow">NEXT QUESTION</p>

              <h2>Why wasn't the original .NET enough?</h2>

              <Link to="/dotnet-core">
                Continue to .NET Core →
              </Link>
            </div>

          </article>
        </div>
      </section>
    </>
  )
}

export default DotNet
