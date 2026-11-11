
import { Link } from 'react-router-dom'
import './Journey.css'
import { useState } from 'react'

const journeyTopics = [
  {
    number: '01',
    topic: 'csharp',
    title: 'C#',
    question: 'Where I started.',
    description:
      'I started with the intention of learning the fundamentals of C#.',
    path: '/csharp',
  },
  {
    number: '02',
    topic: 'program cs',
    title: 'Program.cs',
    question: 'Why is all this code here?',
    description:
      "One Program.cs file made me realize that knowing C# syntax wasn't enough to understand the application.",
    path: '/program-cs',
  },
  {
    number: '03',
    topic: 'dotnet',
    title: '.NET',
    question: 'What exactly is .NET?',
    description:
      'I started exploring the relationship between C# and the .NET platform.',
    path: '/dotnet',
  },
  {
    number: '04',
    topic: 'dotnet core',
    title: '.NET Core',
    question: 'Why was it created?',
    description:
      'This led me into the history of .NET and why Microsoft introduced .NET Core.',
    path: '/dotnet-core',
  },
  {
    number: '05',
    topic: 'aspnet core',
    title: 'ASP.NET Core',
    question: 'Why do we need ASP.NET Core?',
    description:
      'The journey moved from understanding the platform to understanding web applications.',
    path: '/aspnet-core',
  },
  {
    number: '06',
    topic: 'kestrel',
    title: 'Kestrel',
    question: 'Who actually receives the request?',
    description:
      'This question took me deeper into how an ASP.NET Core application receives and handles web requests.',
    path: '/kestrel',
  },
  {
    number: '07',
    topic: 'request pipeline',
    title: 'request pipeline',
    question: 'What happens after Kestrel receives the request?',
    description:
      'I explored how ASP.NET Core uses middleware to process HTTP requests through a common request pipeline.',
    path: '/request-pipeline',
  }
]

function Journey() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTopics = journeyTopics.filter((item) => {
        const searchText =`
            ${item.title}
            ${item.question}
            ${item.description}
        `.toLowerCase()

        return searchText.includes(searchTerm);
    })

    return (
        <>
        <section className="journey-header">
            <div className="container">
            <p className="eyebrow">MY LEARNING JOURNEY</p>
            <h1>From C# fundamentals to understanding .NET.</h1>
            <p className="journey-intro">
                This isn't a roadmap I followed.
                It's a collection of questions, experiments and discoveries
                that gradually changed how I understand the .NET ecosystem.
            </p>
            </div>
        </section>

        <section className="journey-cards">
            <div className="container">
            <div className="journey-search">
                <div className="search-label">Explore the journey</div>
                <div className="search-wrapper">
                <span className="search-icon">⌕</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search my journey..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
            </div>

            <div className="row g-4">
                
                {filteredTopics.map((item) => (
                    <div className="col-12 col-md-6 col-lg-4" key={item.number}>
                        <article className="learning-card" data-topic={item.topic}>
                        <span className="card-number">{item.number}</span>
                        <h2>{item.title}</h2>
                        <p className="card-question">{item.question}</p>
                        <p>{item.description}</p>
                        <Link to={item.path}>Explore →</Link>
                        </article>
                    </div>
                ))}

                {filteredTopics.length === 0  && (
                    <p className="text-center" >
                        No matching topics found.
                    </p>
                )}


            </div>
            </div>
        </section>

        <section className="next-section">
            <div className="container">
            <div className="next-card">
                <p className="eyebrow">NEXT QUESTIONS</p>
                <h2>The journey doesn't stop at Kestrel.</h2>
                <p>
                Kestrel led to more questions.
                How does a request move through the application?
                Who decides which code handles it?
                How do services get created?
                How does the application know who is allowed to do what?
                </p>
                <p>
                Middleware. Routing. Dependency Injection.
                Authentication. Authorization.
                </p>
            </div>
            </div>
        </section>
        </>
    )
}

export default Journey
