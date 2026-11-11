import { Link } from 'react-router-dom'
import './ProgramCs.css'

function ProgramCs() {
  return (
    <>
      <section className="note-header">
        <div className="container">
          <p className="eyebrow">JOURNEY · 02</p>

          <h1>Why is all this code in Program.cs?</h1>

          <p className="note-intro">
            I knew some C# syntax, but when I opened Program.cs,
            I couldn't explain why all that code was there or what
            the application was actually doing with it.
          </p>
        </div>
      </section>

      <section className="note-content">
        <div className="container">
          <article className="note-story">

            {/* 01 - The Question */}
            <div className="story-block">
              <span className="story-number">01</span>
              <p className="eyebrow">THE QUESTION</p>

              <h2>Why is all this code in Program.cs?</h2>

              <p>
                I knew C# fundamentals such as variables, methods,
                classes and objects.
              </p>

              <p>
                But when I started working with an ASP.NET Core
                application, I opened a file called <code>Program.cs</code>
                and saw code that I couldn't fully explain.
              </p>

              <pre>
                <code>{`var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.Run();`}</code>
              </pre>

              <p>
                The syntax was familiar. The purpose of the code was not.
              </p>

              <blockquote>
                What exactly is happening inside Program.cs?
              </blockquote>
            </div>

            {/* 02 - The First Realization */}
            <div className="story-block">
              <span className="story-number">02</span>
              <p className="eyebrow">THE FIRST REALIZATION</p>

              <h2>Program.cs is still just C#.</h2>

              <p>
                One of the first things I had to understand was that
                <code> Program.cs </code> wasn't a new language or a
                special type of syntax.
              </p>

              <p>It is a C# source file.</p>

              <p>
                Instead of mainly containing business logic such as
                calculating an order total or retrieving a customer,
                this file is primarily used to configure the application
                and define how it starts.
              </p>

              <div className="simple-diagram">
                <div>
                  C# code
                  <small>Program.cs</small>
                </div>
                <span>↓</span>
                <div>Configure application</div>
                <span>↓</span>
                <div>Start application</div>
              </div>
            </div>

            {/* 03 - The Builder */}
            <div className="story-block">
              <span className="story-number">03</span>
              <p className="eyebrow">THE BUILDER</p>

              <h2>So what is the builder?</h2>

              <p>The first line that caught my attention was:</p>

              <pre>
                <code>{`var builder = WebApplication.CreateBuilder(args);`}</code>
              </pre>

              <p>
                At first, I saw this as just another variable being created.
              </p>

              <p>
                But the important part was what <code>CreateBuilder()</code>
                was preparing for.
              </p>

              <p>
                It creates a builder that gives the application a place
                to configure the services, configuration, logging and
                other parts needed before the web application is built.
              </p>

              <div className="simple-diagram">
                <div>CreateBuilder()</div>
                <span>↓</span>
                <div>Application configuration</div>
              </div>
            </div>

            {/* 04 - Services */}
            <div className="story-block">
              <span className="story-number">04</span>
              <p className="eyebrow">SERVICES</p>

              <h2>Where do the application's services come from?</h2>

              <p>
                While exploring Program.cs, I started seeing code like:
              </p>

              <pre>
                <code>{`builder.Services.AddControllers();`}</code>
              </pre>

              <p>
                This introduced another concept: <strong>services</strong>.
              </p>

              <p>
                An ASP.NET Core application can depend on many objects
                and services. Instead of manually creating every object
                throughout the application, services can be registered
                with the dependency injection container.
              </p>

              <div className="simple-diagram">
                <div>Program.cs</div>
                <span>↓</span>
                <div>Register services</div>
                <span>↓</span>
                <div>DI container</div>
              </div>

              <p>
                I didn't understand dependency injection fully at this
                point, but I now had a place to continue my investigation.
              </p>
            </div>

            {/* 05 - Build */}
            <div className="story-block">
              <span className="story-number">05</span>
              <p className="eyebrow">BUILD</p>

              <h2>Then what does Build() actually do?</h2>

              <p>
                After configuring the application, I found another line:
              </p>

              <pre>
                <code>{`var app = builder.Build();`}</code>
              </pre>

              <p>This was another important distinction.</p>

              <p>
                The builder is used to prepare and configure the
                application. Calling <code>Build()</code> creates
                the web application from that configuration.
              </p>

              <div className="simple-diagram">
                <div>Builder</div>
                <span>↓</span>
                <div>Build()</div>
                <span>↓</span>
                <div>WebApplication</div>
              </div>
            </div>

            {/* 06 - The Request Pipeline */}
            <div className="story-block">
              <span className="story-number">06</span>
              <p className="eyebrow">THE REQUEST PIPELINE</p>

              <h2>But building the application wasn't the whole story.</h2>

              <p>I then started seeing code such as:</p>

              <pre>
                <code>{`app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();`}</code>
              </pre>

              <p>
                These lines configure how the application handles
                incoming HTTP requests. Middleware can inspect or modify
                a request as it moves through the pipeline, while
                endpoint mapping determines which application code
                can handle the request.
              </p>

              <div className="story-diagram">
                <div>HTTP Request</div>
                <span>↓</span>
                <strong>Middleware</strong>
                <span>↓</span>
                <strong>Routing</strong>
                <span>↓</span>
                <strong>Endpoint</strong>
                <span>↓</span>
                <div>HTTP Response</div>
              </div>
            </div>

            {/* 07 - The Bigger Picture */}
            <div className="story-block">
              <span className="story-number">07</span>
              <p className="eyebrow">THE BIGGER PICTURE</p>

              <h2>Program.cs started making more sense.</h2>

              <p>
                I was beginning to see that Program.cs wasn't simply
                a file where someone had put a collection of unrelated
                C# statements.
              </p>

              <p>It was participating in the setup of the application.</p>

              <div className="simple-diagram">
                <div>
                  CreateBuilder()
                  <small>Prepare</small>
                </div>
                <span>↓</span>
                <div>
                  Configure
                  <small>Services &amp; application</small>
                </div>
                <span>↓</span>
                <div>
                  Build()
                  <small>Create application</small>
                </div>
                <span>↓</span>
                <div>
                  Configure pipeline
                  <small>Process requests</small>
                </div>
              </div>
            </div>

            {/* 08 - The Next Question */}
            <div className="story-block">
              <span className="story-number">08</span>
              <p className="eyebrow">THE NEXT QUESTION</p>

              <h2>But who actually receives the HTTP request?</h2>

              <p>
                Understanding Program.cs answered one part of my question.
              </p>

              <p>But I still had a fundamental question.</p>

              <blockquote>
                When a browser sends an HTTP request, who receives it first?
              </blockquote>

              <p>
                Is it <code>Program.cs</code>? ASP.NET Core? Middleware?
                Or something underneath all of them?
              </p>
            </div>

            {/* Next Question */}
            <div className="next-question">
              <p className="eyebrow">NEXT QUESTION</p>

              <h2>Who actually receives the request?</h2>

              <p>
                This question led me to Kestrel and to a deeper look at
                what happens before a request enters the ASP.NET Core
                pipeline.
              </p>

              <Link to="/kestrel">
                Continue to Kestrel →
              </Link>
            </div>

          </article>
        </div>
      </section>
    </>
  )
}

export default ProgramCs