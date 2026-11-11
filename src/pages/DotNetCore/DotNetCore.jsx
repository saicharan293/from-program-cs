
import { Link } from 'react-router-dom'
import './DotNetCore.css'

function DotNetCore() {
    return (
        <>
            <section className="note-header">
                <div className="container">
                    <p className="eyebrow">
                        JOURNEY · 04
                    </p>

                    <h1>
                        Why wasn't the original .NET enough?
                    </h1>

                    <p className="note-intro">
                        I had just started understanding .NET as a common platform.
                        Then another question appeared: why did Microsoft need .NET Core?
                    </p>
                </div>
            </section>

            <section className="note-content">
                <div className="container">
                    <article className="note-story">

                        {/* 01 */}
                        <div className="story-block">
                            <span className="story-number">01</span>

                            <p className="eyebrow">THE QUESTION</p>

                            <h2>
                                If .NET already existed, why create .NET Core?
                            </h2>

                            <p>So I initially thought:</p>

                            <blockquote>
                                If .NET already solves the platform problem,
                                what problem was left for .NET Core to solve?
                            </blockquote>
                        </div>

                        {/* 02 */}
                        <div className="story-block">
                            <span className="story-number">02</span>

                            <p className="eyebrow">THE OLD WORLD</p>

                            <h2>
                                The original .NET Framework was closely tied to Windows.
                            </h2>

                            <p>
                                The .NET Framework was deeply integrated with the Windows
                                ecosystem and was primarily designed for Windows applications.
                            </p>

                            <p>
                                It worked well in that environment, but the software
                                landscape was changing.
                            </p>
                        </div>

                        {/* 03 */}
                        <div className="story-block highlight-block">
                            <span className="story-number">03</span>

                            <p className="eyebrow">THE WORLD CHANGED</p>

                            <h2>
                                Applications were no longer living in one environment.
                            </h2>

                            <p>
                                Developers increasingly needed applications to work across
                                different operating systems and deployment environments.
                            </p>

                            <div className="story-diagram">
                                <div>Windows</div>
                                <div>Linux</div>
                                <div>macOS</div>

                                <span>↓</span>

                                <strong>Cross-platform applications</strong>
                            </div>
                        </div>

                        {/* 04 */}
                        <div className="story-block">
                            <span className="story-number">04</span>

                            <p className="eyebrow">THE PROBLEM</p>

                            <h2>
                                Microsoft needed a foundation designed for a cross-platform future.
                            </h2>

                            <p>
                                Microsoft could continue adding features to the existing
                                .NET Framework, but it was designed around the Windows ecosystem.
                            </p>

                            <p>
                                As cross-platform development became increasingly important,
                                Microsoft needed a different foundation that could support
                                this direction from the ground up.
                            </p>

                            <blockquote>
                                Microsoft needed a new .NET implementation designed for
                                this cross-platform future.
                            </blockquote>
                        </div>

                        {/* 05 */}
                        <div className="story-block">
                            <span className="story-number">05</span>

                            <p className="eyebrow">THE NEW DIRECTION</p>

                            <h2>Microsoft built a new foundation.</h2>

                            <p>
                                Instead of simply extending the existing .NET Framework,
                                Microsoft created a new implementation of .NET designed
                                around cross-platform development.
                            </p>

                            <div className="simple-diagram">
                                <div>
                                    .NET Framework
                                    <span>Windows-focused</span>
                                </div>

                                <span>↘</span>

                                <div>
                                    .NET Core
                                    <span>Cross-platform</span>
                                </div>
                            </div>
                        </div>

                        {/* 06 */}
                        <div className="story-block">
                            <span className="story-number">06</span>

                            <p className="eyebrow">.NET CORE</p>

                            <h2>
                                This new direction became .NET Core.
                            </h2>

                            <p>
                                .NET Core was designed to be cross-platform, open source
                                and modular.
                            </p>

                            <p>
                                This gave developers a cross-platform implementation of .NET,
                                rather than being limited to the Windows-focused .NET Framework.
                            </p>

                            <div className="concept-grid">
                                <div className="concept-card">
                                    <h3>Cross-platform</h3>

                                    <p>
                                        Applications could target Windows, Linux and macOS.
                                    </p>
                                </div>

                                <div className="concept-card">
                                    <h3>Open source</h3>

                                    <p>
                                        The platform was developed openly with the community.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 07 */}
                        <div className="story-block">
                            <span className="story-number">07</span>

                            <p className="eyebrow">WHAT CHANGED FOR ME</p>

                            <h2>
                                C# didn't suddenly become a different language.
                            </h2>

                            <p>This was an important distinction for me.</p>

                            <p>
                                C# remained the language I was writing.
                                What changed was the .NET implementation and runtime
                                that the application was built to run on.
                            </p>

                            <div className="simple-diagram">
                                <div>C#</div>

                                <span>↓</span>

                                <div>.NET Core</div>

                                <span>↓</span>

                                <div>Application</div>
                            </div>
                        </div>

                        {/* NEXT QUESTION */}
                        <div className="next-question">
                            <p className="eyebrow">NEXT QUESTION</p>

                            <h2>
                                If .NET Core is the platform, how do we build a web
                                application on it?
                            </h2>

                            <Link to="/aspnet-core">
                                Continue to ASP.NET Core →
                            </Link>
                        </div>

                    </article>
                </div>
            </section>
        </>
    )
}

export default DotNetCore
