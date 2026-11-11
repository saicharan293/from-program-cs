
import { Link } from 'react-router-dom'
import './AspNetCore.css'

function AspNetCore() {
    return (
        <>
            {/* PAGE HEADER */}
            <section className="note-header">
                <div className="container">
                    <p className="eyebrow">JOURNEY · 05</p>

                    <h1>
                        If .NET is the platform, why do we need ASP.NET Core?
                    </h1>

                    <p className="note-intro">
                        I understood .NET as a general-purpose platform.
                        Then I started wondering what was needed specifically
                        to build web applications.
                    </p>
                </div>
            </section>

            {/* STORY */}
            <section className="note-content">
                <div className="container">
                    <article className="note-story">

                        {/* 01 */}
                        <div className="story-block">
                            <span className="story-number">01</span>

                            <p className="eyebrow">THE QUESTION</p>

                            <h2>
                                What does .NET actually give me?
                            </h2>

                            <p>
                                I had started understanding .NET as the platform
                                that provides the runtime, libraries, and tools
                                needed to build and run applications.
                            </p>

                            <p>
                                But then another question came to mind:
                            </p>

                            <div className="question-box">
                                <p className="eyebrow">THE QUESTION</p>

                                <h3>
                                    If .NET is general-purpose, how do I build
                                    a web application with it?
                                </h3>
                            </div>
                        </div>

                        {/* 02 */}
                        <div className="story-block">
                            <span className="story-number">02</span>

                            <p className="eyebrow">THE PROBLEM</p>

                            <h2>
                                Web applications have their own problems.
                            </h2>

                            <p>
                                A web application isn't just C# code running somewhere.
                            </p>

                            <p>
                                It also needs to deal with concerns that are
                                specific to the web.
                            </p>

                            <div className="row g-4 mt-4">
                                <div className="col-12 col-md-6">
                                    <div className="learning-card">
                                        <h3>HTTP</h3>

                                        <p>
                                            Receive HTTP requests and produce
                                            HTTP responses.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="learning-card">
                                        <h3>Routing</h3>

                                        <p>
                                            Decide which part of the application
                                            should handle a request.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="learning-card">
                                        <h3>Authentication</h3>

                                        <p>
                                            Determine who the user is.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="learning-card">
                                        <h3>Authorization</h3>

                                        <p>
                                            Determine what that user is allowed to do.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 03 */}
                        <div className="story-block highlight-block">
                            <span className="story-number">03</span>

                            <p className="eyebrow">THE IDEA</p>

                            <h2>
                                What if the web-specific problems had their own toolkit?
                            </h2>

                            <p>
                                Instead of making the general .NET platform
                                responsible for web-specific concerns, Microsoft
                                built ASP.NET Core as a web framework that runs on .NET.
                            </p>

                            <div className="simple-diagram">
                                <div className="text-center">
                                    .NET
                                    <small>General platform</small>
                                </div>

                                <span>↓</span>

                                <div className="text-center">
                                    ASP.NET Core
                                    <small>Web framework</small>
                                </div>
                            </div>
                        </div>

                        {/* 04 */}
                        <div className="story-block">
                            <span className="story-number">04</span>

                            <p className="eyebrow">ASP.NET CORE</p>

                            <h2>
                                ASP.NET Core is the web framework.
                            </h2>

                            <p>
                                ASP.NET Core provides the web-specific infrastructure
                                needed to build modern web applications and APIs
                                on top of .NET.
                            </p>

                            <p>
                                This includes the infrastructure for handling HTTP
                                requests, routing, middleware, dependency injection,
                                authentication and authorization, along with different
                                ways of building web applications.
                            </p>
                        </div>

                        {/* 05 */}
                        <div className="story-block">
                            <span className="story-number">05</span>

                            <p className="eyebrow">THE DISTINCTION</p>

                            <h2>
                                C#, .NET and ASP.NET Core are not the same thing.
                            </h2>

                            <div className="simple-diagram">
                                <div className="text-center">
                                    C#
                                    <small>Programming language</small>
                                </div>

                                <span>↓</span>

                                <div className="text-center">
                                    .NET
                                    <small>Platform</small>
                                </div>

                                <span>↓</span>

                                <div className="text-center">
                                    ASP.NET Core
                                    <small>Web framework</small>
                                </div>
                            </div>

                            <p>
                                Understanding this distinction helped me make
                                sense of the different terms I kept encountering
                                in .NET applications.
                            </p>
                        </div>

                        {/* 06 */}
                        <div className="story-block">
                            <span className="story-number">06</span>

                            <p className="eyebrow">BACK TO PROGRAM.CS</p>

                            <h2>
                                Then I looked at Program.cs again.
                            </h2>

                            <p>I started seeing code like:</p>

                            <pre>
                                <code>
                                    {'var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();'}
                                </code>
                            </pre>

                            <p>
                                I could now identify the technology I was looking
                                at, but I still couldn't explain what this code
                                was actually doing.
                            </p>

                            <p>
                                I had started with questions about C# and somehow
                                ended up looking at an ASP.NET Core application.
                            </p>

                            <p>
                                And now I had even more questions.
                            </p>

                            <blockquote>
                                Why is all this code in Program.cs?
                            </blockquote>
                        </div>

                        {/* NEXT QUESTION */}
                        <div className="next-question">
                            <p className="eyebrow">NEXT QUESTION</p>

                            <h2>
                                Why is all this code in Program.cs?
                            </h2>

                            <p>
                                I understood what C#, .NET and ASP.NET Core
                                were at a high level.
                            </p>

                            <Link to="/program-cs">
                                Continue to Program.cs investigation →
                            </Link>
                        </div>

                    </article>
                </div>
            </section>
        </>
    )
}

export default AspNetCore
