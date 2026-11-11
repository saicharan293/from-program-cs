
import { Link } from "react-router-dom"
import "./RequestPipeline.css"

function RequestPipeline() {
  return (
    <>
      <section className="note-header">
        <div className="container">
          <p className="eyebrow">JOURNEY · 07</p>

          <h1>What happens after Kestrel receives the request?</h1>

          <p className="note-intro">
            I finally understood who receives the HTTP request.
            But Kestrel was only the beginning. I now needed to understand
            how ASP.NET Core processes that request.
          </p>
        </div>
      </section>

      <section className="note-content">
        <div className="container">
          <article className="note-story">

            {/* 01 — THE QUESTION */}
            <div className="story-block">
              <span className="story-number">01</span>
              <p className="eyebrow">THE QUESTION</p>

              <h2>The Kestrel receives the request. Then What?</h2>

              <p>
                I had learned that Kestrel is responsible for the
                web-server side of communication.
              </p>

              <p>
                It receives the HTTP request and passes it into
                the ASP.NET Core application.
              </p>

              <p>But that created another question:</p>

              <blockquote>
                Once ASP.NET Core receives the request, who decides
                what should happen to it?
              </blockquote>
            </div>

            {/* 02 — THE PROBLEM */}
            <div className="story-block">
              <span className="story-number">02</span>
              <p className="eyebrow">THE PROBLEM</p>

              <h2>Every request may need common processing.</h2>

              <p>
                Imagine an application with hundreds of controllers.
              </p>

              <p>
                Many requests may need common operations such as
                logging, authentication, error handling, or checking
                whether a request should continue.
              </p>

              <p>
                We could put these checks inside every controller.
                But that would create duplicated logic and make the
                application harder to maintain.
              </p>

              <div className="simple-diagram">
                <div>
                  Controller A
                  <small>Logging</small>
                </div>

                <div>
                  Controller B
                  <small>Logging</small>
                </div>

                <div>
                  Controller C
                  <small>Logging</small>
                </div>
              </div>

              <p>
                There had to be a better way to handle functionality
                that applies to many or most requests.
              </p>
            </div>

            {/* 03 — THE IDEA */}
            <div className="story-block">
              <span className="story-number">03</span>
              <p className="eyebrow">THE IDEA</p>

              <h2>What if requests passed through a common chain?</h2>

              <p>
                Instead of putting the same logic into every
                controller, ASP.NET Core allows us to place
                common request-processing logic into components
                called <strong>middleware</strong>.
              </p>

              <p>
                Each middleware can perform some work and then
                decide whether the request should continue to
                the next component.
              </p>

              <div className="story-diagram">
                <div>HTTP Request</div>
                <span>↓</span>
                <strong>Middleware 1</strong>
                <span>↓</span>
                <strong>Middleware 2</strong>
                <span>↓</span>
                <strong>Middleware 3</strong>
                <span>↓</span>
                <div>Endpoint</div>
              </div>
            </div>

            {/* 04 — THE REQUEST PIPELINE */}
            <div className="story-block">
              <span className="story-number">04</span>
              <p className="eyebrow">THE REQUEST PIPELINE</p>

              <h2>This chain became the request pipeline.</h2>

              <p>
                The ASP.NET Core request pipeline is the sequence
                of middleware components through which an HTTP
                request passes.
              </p>

              <p>
                Each middleware can perform work before passing
                the request forward.
              </p>

              <p>
                Middleware can also perform work after the next
                component has finished processing the request.
              </p>

              <div className="simple-diagram">
                <div>
                  Request
                  <small>Enters pipeline</small>
                </div>

                <span>↓</span>

                <div>
                  Middleware
                  <small>Process</small>
                </div>

                <span>↓</span>

                <div>
                  Next middleware
                  <small>Continue</small>
                </div>

                <span>↓</span>

                <div>
                  Endpoint
                  <small>Handle request</small>
                </div>
              </div>
            </div>

            {/* 05 — WHY MIDDLEWARE? */}
            <div className="story-block">
              <span className="story-number">05</span>
              <p className="eyebrow">WHY MIDDLEWARE?</p>

              <h2>Common behavior can live in one place.</h2>

              <p>
                This was the architectural idea that finally
                made middleware useful to me.
              </p>

              <p>
                If many requests need the same functionality,
                that functionality can be placed into middleware
                instead of being repeatedly implemented in
                controllers.
              </p>

              <div className="concept-grid">
                <div className="concept-card">
                  <h3>Logging</h3>
                  <p>
                    Record information about incoming requests
                    and outgoing responses.
                  </p>
                </div>

                <div className="concept-card">
                  <h3>Authentication</h3>
                  <p>
                    Establish the identity associated with
                    the request.
                  </p>
                </div>

                <div className="concept-card">
                  <h3>Error handling</h3>
                  <p>
                    Handle failures consistently instead of
                    repeating the same logic everywhere.
                  </p>
                </div>

                <div className="concept-card">
                  <h3>Authorization</h3>
                  <p>
                    Apply access-control decisions before
                    protected functionality executes.
                  </p>
                </div>
              </div>
            </div>

            {/* 06 — ORDER MATTERS */}
            <div className="story-block">
              <span className="story-number">06</span>
              <p className="eyebrow">ORDER MATTERS</p>

              <h2>Middleware is not just a collection of components.</h2>

              <p>
                Another important realization was that middleware
                executes in a specific order.
              </p>

              <p>
                The order matters because one middleware can affect
                what the next middleware receives or whether the
                request reaches it at all.
              </p>

              <div className="story-diagram">
                <strong>Middleware A</strong>
                <span>↓</span>
                <strong>Middleware B</strong>
                <span>↓</span>
                <strong>Middleware C</strong>
                <span>↓</span>
                <strong>Endpoint</strong>
              </div>

              <p>
                So when I look at middleware configuration in
                <code>Program.cs</code>, the order of those
                registrations is part of the application's
                behaviour.
              </p>
            </div>

            {/* 07 — PROGRAM.CS AGAIN */}
            <div className="story-block">
              <span className="story-number">07</span>
              <p className="eyebrow">PROGRAM.CS AGAIN</p>

              <h2>Program.cs was starting to make sense.</h2>

              <p>I had previously seen code such as:</p>

              <pre>
                <code>{`app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();`}</code>
              </pre>

              <p>
                I could now see that these lines were not random
                configuration statements.
              </p>

              <p>
                They were helping define how requests should be
                processed by the application.
              </p>

              <div className="simple-diagram">
                <div>
                  Program.cs
                  <small>Configure application</small>

                  <span>↓</span>

                  <div>
                    Middleware
                    <small>Process request</small>
                  </div>

                  <span>↓</span>

                  <div>
                    Endpoint
                    <small>Execute application code</small>
                  </div>
                </div>
              </div>
            </div>

            {/* 08 — ARCHITECTURE VIEW */}
            <div className="story-block">
              <span className="story-number">08</span>
              <p className="eyebrow">ARCHITECTURE VIEW</p>

              <h2>
                The pipeline separates common request concerns
                from application logic.
              </h2>

              <p>
                This was the point where I started looking at
                ASP.NET Core from a more architectural perspective.
              </p>

              <p>
                Controllers should primarily deal with application
                behaviour rather than repeatedly implementing
                cross-cutting concerns such as logging, authentication,
                or centralized error handling.
              </p>

              <p>
                Middleware gives the application a place to handle
                those concerns around the request-processing flow.
              </p>

              <div className="simple-diagram">
                <div>Request</div>
                <span>↓</span>

                <div>
                  Cross-cutting concerns
                  <small>Middleware</small>
                </div>

                <span>↓</span>

                <div>
                  Application logic
                  <small>Controllers / endpoints</small>
                </div>

                <span>↓</span>
                <div>Response</div>
              </div>
            </div>

            {/* 09 — THE BIGGER PICTURE */}
            <div className="story-block">
              <span className="story-number">09</span>
              <p className="eyebrow">THE BIGGER PICTURE</p>

              <h2>The entire request journey was becoming visible.</h2>

              <p>
                I could now connect the pieces I had learned so far.
              </p>

              <div className="story-diagram">
                <div>
                  Browser
                  <small>Sends request</small>
                </div>

                <span>↓</span>

                <div>
                  Kestrel
                  <small>Receives HTTP</small>
                </div>

                <span>↓</span>

                <div>
                  Request Pipeline
                  <small>Middleware</small>
                </div>

                <span>↓</span>

                <div>
                  Endpoint
                  <small>Application code</small>
                </div>

                <span>↓</span>

                <div>HTTP Response</div>
              </div>

              <p>
                Kestrel handles the web-server side.
                The ASP.NET Core request pipeline handles the
                application's request-processing flow.
              </p>
            </div>

            {/* 10 — INTERVIEW DEPTH */}
            <div className="story-block interview-depth">
              <span className="story-number">10</span>
              <p className="eyebrow">INTERVIEW DEPTH</p>

              <h2>Can I explain the request pipeline properly?</h2>

              <h3>What is the ASP.NET Core request pipeline?</h3>

              <p>
                It is the sequence of middleware components through
                which an HTTP request passes before reaching the
                appropriate endpoint, with the response travelling
                back through the pipeline.
              </p>

              <h3>Why do we need middleware?</h3>

              <p>
                Middleware provides a centralized way to implement
                request-processing behaviour that may apply across
                multiple endpoints, such as logging, authentication,
                authorization, exception handling, and other
                cross-cutting concerns.
              </p>

              <h3>Does every middleware have to pass the request forward?</h3>

              <p>
                No. Middleware can choose not to call the next
                component. In that case, the pipeline can terminate
                at that middleware instead of continuing toward
                the endpoint.
              </p>

              <h3>Why does middleware order matter?</h3>

              <p>
                Middleware executes in the order it is added to
                the pipeline for the incoming request. Therefore,
                changing the order can change application behaviour.
              </p>

              <h3>Is middleware the same as a controller?</h3>

              <p>
                No. Middleware participates in the request pipeline
                and can operate on many or all requests. A controller
                action is application-level endpoint logic selected
                after routing determines the appropriate endpoint.
              </p>

              <h3>What is the architectural benefit?</h3>

              <p>
                Middleware allows common request concerns to be
                separated from individual endpoint implementations,
                reducing duplication and keeping application logic
                focused on its actual responsibility.
              </p>

              <div className="question-box">
                <p className="eyebrow">INTERVIEW CHECK</p>

                <h3>
                  Try explaining this without memorizing the definition.
                </h3>

                <ul>
                  <li>What happens after Kestrel receives a request?</li>
                  <li>What is the request pipeline?</li>
                  <li>What is middleware?</li>
                  <li>
                    Why don't we put common request logic inside
                    every controller?
                  </li>
                  <li>Why does middleware order matter?</li>
                  <li>
                    Can middleware stop a request from reaching
                    the endpoint?
                  </li>
                  <li>How is middleware different from a controller?</li>
                  <li>Where is middleware configured?</li>
                  <li>
                    How does middleware fit into the overall architecture?
                  </li>
                </ul>
              </div>
            </div>

            {/* NEXT QUESTION */}
            <div className="next-question">
              <p className="eyebrow">NEXT QUESTION</p>

              <h2>
                If middleware processes the request, how does
                ASP.NET Core know which endpoint should handle it?
              </h2>

              <p>
                That question led me to routing and how ASP.NET Core
                maps an incoming request to an endpoint.
              </p>

              <Link to="/routing">
                Continue to Routing →
              </Link>
            </div>

          </article>
        </div>
      </section>
    </>
  )
}

export default RequestPipeline
