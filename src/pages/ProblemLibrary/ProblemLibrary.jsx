
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import "./ProblemLibrary.css";
import { languages } from "monaco-editor";


const emptyProblem = {
    title: "",
    category: "",
    language: "csharp",
    statement: "",
    code: "",
    explanation: "",
    timeComplexity: "",
    spaceComplexity: "",
    leetcodeUrl: "",
    practicedDate : new Date().toISOString().slice(0, 10)
}

function ProblemLibrary() {

    const [problems, setProblems] = useState(() =>{
        try {
            return JSON.parse(localStorage.getItem("problemLibrary") || "[]");
        } catch (error) {
            return [];
        }
    });

    const [formData, setFormData] = useState(emptyProblem);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    useEffect(() => {
        localStorage.setItem("problemLibrary", JSON.stringify(problems));
    }, [problems]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleView = (problem) => {
        setSelectedProblem(problem);
        setShowViewModal(true);
    }


    const resetForm = () => {
        setFormData({...emptyProblem, practicedDate: new Date().toISOString().slice(0, 10)});

        setEditingId(null);
        setShowForm(false);
    }

    

    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("csharp");
    const handleSubmit = (e) => {
        e.preventDefault();

        if(editingId != null){
            setProblems((previous) => 
                previous.map((problem) => problem.id === editingId ? { ...formData, id: editingId} : problem )
            );
        }
        else {
            const newProblem = {
                ...formData,
                id: Date.now()
            };

            setProblems((previous) => [newProblem, ...previous]);
        }

        resetForm();
        // Database saving will be connected later.
        // alert("Form UI is ready. Saving functionality will be added next.");
    };


    const handleEdit = (problem) =>{
        setFormData({...problem});
        setEditingId(problem.id);
        setShowForm(true);
    } 
    
    const handleDelete = (id) =>{
        const confirm = window.confirm("Are you sure you want to delete this problem?");
        if(!confirm) return;

        setProblems((previous) => 
            previous.filter((problem) => problem.id != id)
        );

        if(editingId == id){
            resetForm();
        }
    }

    

    const filteredProblems = problems.filter((problem) => {
        const search = searchTerm.toLocaleLowerCase();

        return(
            problem.title.toLowerCase().includes(search) ||
            problem.category.toLowerCase().includes(search) ||
            problem.language.toLowerCase().includes(search) ||
            problem.statement.toLowerCase().includes(search)
        );
    })

    
    return (
        <div className="problem-library">

            <header className="problem-header">
                <p className="eyebrow">MY PRACTICE · PROBLEM LIBRARY</p>
                <h1>Problems I've Practiced</h1>
                <p className="description"> A collection of programming problems, solutions, and the thinking behind them. </p>
            </header>

            <section className="problem-toolbar">
                <input
                    type="text"
                    placeholder="Search problems..."
                    className="problem-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button
                    className="add-problem-btn"
                    onClick={() =>{
                        setShowForm({
                            ...emptyProblem, 
                            practicedDate: new Date().toISOString().slice(0, 10) 
                        });
                        setEditingId(null);
                        setShowForm(true);
                    }}
                >
                    {showForm ? "Close Form" : "+ Add Problem"}
                </button>
            </section>

            {showForm && (
                <div className="problem-modal-overlay" onClick={resetForm}>
                    <section className="problem-modal" onClick={(e)=>e.stopPropagation()}>
                        <div className="problem-form-header">
                            <h2>{editingId != null ? "Edit Problem" : "Add a New Problem"}</h2>
                            <p>Record the problem and how you approached it.</p>
                        </div>

                        <form className="problem-form" onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label>Problem Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Find Duplicate Elements"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category *</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select category</option>
                                        <option value="Arrays">Arrays</option>
                                        <option value="Strings">Strings</option>
                                        <option value="Dictionaries">Dictionaries</option>
                                        <option value="HashSet">HashSet</option>
                                        <option value="Recursion">Recursion</option>
                                        <option value="Linked Lists">Linked Lists</option>
                                        <option value="Sorting">Sorting</option>
                                        <option value="Searching">Searching</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Programming Language *</label>
                                    <select
                                        name="language"
                                        value={formData.language}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="csharp">C#</option>
                                        <option value="python">Python</option>
                                        <option value="javascript">JavaScript</option>
                                        <option value="java">Java</option>
                                        <option value="cpp">C++</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Problem Statement *</label>
                                <textarea
                                    name="statement"
                                    rows="4"
                                    value={formData.statement}
                                    onChange={handleChange}
                                    placeholder="Describe the problem..."
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Solution Code *</label>

                                <div className="code-editor-container">
                                    <Editor
                                        height="400px"
                                        language={formData.language}
                                        theme="vs-dark"
                                        value={formData.code}
                                        onChange={(value) => 
                                            setFormData((previous) => ({
                                                ...previous,
                                                code: value || ""
                                            }))
                                        }
                                        options={{
                                            minimap: { enabled: false },
                                            fontSize: 14,
                                            lineNumbers: "on",
                                            automaticLayout: true,
                                            tabSize: 4,
                                            insertSpaces: true,
                                            autoClosingBrackets: "always",
                                            autoClosingQuotes: "always",
                                            autoIndent: "full",
                                            formatOnPaste: true,
                                            scrollBeyondLastLine: false,
                                            padding: { top: 15, bottom: 15 }
                                        }}
                                    />
                                </div>
                                </div>

                            <div className="form-group">
                                <label>Explanation / Approach *</label>
                                <textarea
                                    rows="5"
                                    name="explanation"
                                    value={formData.explanation}
                                    onChange={handleChange}
                                    placeholder="Explain the logic behind your solution..."
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Time Complexity</label>
                                    <input 
                                        type="text" 
                                        name="timeComplexity"
                                        value={formData.timeComplexity}
                                        onChange={handleChange}
                                        placeholder="e.g. O(n)" />
                                </div>

                                <div className="form-group">
                                    <label>Space Complexity</label>
                                    <input 
                                        type="text" 
                                        name="spaceComplexity"
                                        value={formData.spaceComplexity}
                                        onChange={handleChange}
                                        placeholder="e.g. O(n)" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>LeetCode URL (Optional)</label>
                                    <input
                                        type="url"
                                        name="leetcodeUrl"
                                        value={formData.leetcodeUrl}
                                        onChange={handleChange}
                                        placeholder="https://leetcode.com/problems/..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Date Practiced</label>
                                    <input 
                                        type="date" 
                                        name="practicedDate" 
                                        value={formData.practicedDate} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>

                            <div className="problem-form-actions">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>

                                <button type="submit" className="save-problem-btn">
                                {editingId != null ? "Update Problem": "Save Problem"}  
                                </button>
                            </div>

                        </form>
                    </section>
                </div>
            )}

            <section className="saved-problem">
                <div className="saved-problems-heading">
                    <h2>Your Problems</h2>
                    <span>{problems.length} saved</span>
                </div>

                {filteredProblems.length == 0 ? (
                    <div className="problem-empty">
                        <h2>
                            {problems.length == 0 
                                ? "Your problem library starts here." 
                                : "No matching problems found."}
                        </h2>
                        <p>
                            {problems.length === 0 
                                ? "Save the problems you practise, along with their statements, solutions, and explanations."
                                : "Try searching with a different title or category."
                            }
                        </p>
                    </div>
                ) : (
                    <div className="problem-list">
                        {filteredProblems.map((problem) => (
                            <article className="problem-card" key={problem.id}>
                                <div className="problem-card-top">
                                    <div>
                                        <h3>{problem.title}</h3>
                                        <div className="problem-meta">
                                            <span>{problem.category}</span>
                                            <span>{problem.language === "csharp" ? "C#"  : problem.language}</span>
                                            {problem.practicedDate && (
                                                <span>{new Date(problem.practicedDate + "T00:00:00")
                                                    .toLocaleDateString("en-GB", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric"
                                                    })
                                                }</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="problem-card-actions">

                                        <button
                                            type="button"
                                            className="view-problem-btn"
                                            onClick={() => handleView(problem)}
                                        >
                                            View
                                        </button>

                                        <button
                                            type="button"
                                            className="edit-problem-btn"
                                            onClick={()=>handleEdit(problem)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="delete-problem-btn"
                                            onClick={()=> handleDelete(problem.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                {/* <div className="problem-card-content">
                                    <h4>Problem Statement</h4>
                                    <p>{problem.statement}</p>

                                    <h4>Solution</h4>
                                    <pre className="saved-code">
                                        <code>{problem.code}</code>
                                    </pre>

                                    <h4>Approach</h4>
                                    <p>{problem.explanation}</p>

                                    {(problem.timeComplexity || problem.spaceComplexity) && (
                                        <div className="problem-complexity">
                                        {problem.timeComplexity && (
                                            <span>Time: {problem.timeComplexity}</span>
                                        )}
                                        {problem.spaceComplexity && (
                                            <span>Space: {problem.spaceComplexity}</span>
                                        )}
                                        </div>
                                    )}

                                    {problem.leetcodeUrl && (
                                        <a
                                            href={problem.leetcodeUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="leetcode-link"
                                        >
                                            Open LeetCode problem ↗
                                        </a>
                                    )}
                                </div> */}
                            </article>
                        ))}
                    </div>
                )}
            </section>
            
            {showViewModal && selectedProblem && (
                <div 
                    className="problem-modal-overlay" 
                    onClick={() => setShowViewModal(false)}
                >
                    <section 
                        className="problem-modal view-problem-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="problem-form-header">
                            <div>
                                <p className="eyebrow">PROBLEM DETAILS</p>
                                <h2>{selectedProblem.title}</h2>

                                <div className="problem-meta">
                                    <span>{selectedProblem.category}</span>
                                    <span>{selectedProblem.language == "csharp" ? "C#" : selectedProblem.language}</span>

                                    {selectedProblem.practicedDate && (
                                        <span>{selectedProblem.practicedDate}</span>
                                    )}
                                </div>

                            </div>
                            <button
                                type="button"
                                className="modal-close-btn"
                                onClick={() => setShowViewModal(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="view-problem-content">
                            <section className="view-section">
                                <h3>Problem Statement</h3>
                                <p>{selectedProblem.statement}</p>
                            </section>

                            <section className="view-section">
                                <h3>Solution</h3>

                                <pre className="saved-code">
                                    <code>{selectedProblem.code}</code>
                                </pre>
                            </section>

                            <section className="view-section">
                                <h3>Explanation / Approach</h3>
                                <p>
                                    {selectedProblem.explanation}
                                </p>
                            </section>

                            {(selectedProblem.timeComplexity ||
                                selectedProblem.spaceComplexity) && (
                                <section className="view-section">
                                    <h3>Complexity Analysis</h3>

                                    <div className="problem-complexity">
                                        {selectedProblem.timeComplexity && (
                                            <span>
                                                Time: {selectedProblem.timeComplexity}
                                            </span>
                                        )}

                                        {selectedProblem.spaceComplexity && (
                                            <span>
                                                Space: {selectedProblem.spaceComplexity}
                                            </span>
                                        )}
                                    </div>
                                </section>
                            )}

                            {selectedProblem.leetcodeUrl && (
                                <a 
                                    href={selectedProblem.leetcodeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="leetcode-link"
                                    >
                                    Open LeetCode problem ↗ 
                                </a>
                            )}
                        </div>

                        <div className="view-modal-footer">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setShowViewModal(false)}
                            >
                                Close
                            </button>
                        </div>

                    </section>
                </div>
            )}
        </div>
    );
}

export default ProblemLibrary;
