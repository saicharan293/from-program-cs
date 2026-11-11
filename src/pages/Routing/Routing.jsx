
import "./Routing.css"

function Story({ number, eyebrow, title, children, className = "" }) {
  return (
    <div className={`story-block ${className}`}>
      <span className="story-number">{number}</span>
      <p className="eyebrow">{eyebrow}</p>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  )
}

function Diagram({ children, className = "story-diagram" }) {
  return <div className={className}>{children}</div>
}

function Step({ title, description }) {
  return (
    <div>
      {title}
      {description && <small>{description}</small>}
    </div>
  )
}

function Arrow() {
  return <span>↓</span>
}

function Routing() {
  return (
    <main>
      {/* PAGE HEADER */}
      <section className="note-header">
        <div className="container">
          <p className="eyebrow">JOURNEY · 08</p>

          <h1>
            How does ASP.NET Core know which action should handle a request?
          </h1>

          <p className="note-intro">
            I understood that Kestrel receives the HTTP request and that the
            ASP.NET Core request pipeline processes it. But something was
            still missing: when the request reaches the application, how does
            it know where the request should go?
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="note-content">
        <div className="container">
          <article className="note-story">

            {/* 01 */}
            <Story
              number="01"
              eyebrow="THE QUESTION"
              title="A request has arrived. But who decides where it goes?"
            >
              <p>
                By this point in my journey, I had a better picture of what
                happens before the application handles a request.
              </p>

              <p>
                The browser sends an HTTP request. Kestrel receives it and
                passes it into the ASP.NET Core request-processing pipeline.
              </p>

              <Diagram className="simple-diagram">
                <Step title="Browser" description="Sends HTTP request" />
                <Arrow />
                <Step title="Kestrel" description="Receives request" />
                <Arrow />
                <Step title="ASP.NET Core" description="Request pipeline" />
              </Diagram>

              <p>But now I had another question.</p>

              <blockquote>
                If my application has many controllers and many actions, how
                does ASP.NET Core know which one should handle this request?
              </blockquote>
            </Story>

            {/* 02 */}
            <Story
              number="02"
              eyebrow="THE PROBLEM"
              title="An application can have many possible destinations."
            >
              <p>Imagine an application with these actions:</p>

              <pre><code>{`[HttpGet("products")]
public IActionResult GetProducts()
{
    ...
}

[HttpGet("products/{id}")]
public IActionResult GetProduct(int id)
{
    ...
}

[HttpPost("products")]
public IActionResult CreateProduct(Product product)
{
    ...
}`}</code></pre>

              <p>Now suppose the application receives:</p>

              <pre><code>GET /products/25</code></pre>

              <p>
                The application needs some mechanism to determine which action
                is the intended destination.
              </p>

              <p>
                I initially thought about this as simply "finding the
                controller."
              </p>

              <p>But that mental model turned out to be incomplete.</p>
            </Story>

            {/* 03 */}
            <Story
              number="03"
              eyebrow="THE .NET ANSWER"
              title="This is where routing comes in."
            >
              <p>
                Routing is responsible for determining which{" "}
                <strong>endpoint</strong> should handle an incoming request.
              </p>

              <p>The key question routing answers is:</p>

              <blockquote>
                Which endpoint should handle this request?
              </blockquote>

              <p>This immediately changed how I thought about routing.</p>

              <p>
                Routing is not simply "sending a request to a controller."
                Its job is to examine the request and the application's
                available endpoints and select the appropriate endpoint.
              </p>
            </Story>

            {/* 04 */}
            <Story
              number="04"
              eyebrow="FIRST IMPORTANT DISTINCTION"
              title="Routing selects an endpoint. It doesn't redirect the request."
            >
              <p>
                I initially used the word "redirect" when thinking about
                routing.
              </p>

              <p>But that can create the wrong mental model.</p>

              <p>
                In HTTP, a redirect normally means that the server tells the
                client to make another request, usually using a 3xx status
                code.
              </p>

              <p>Routing is different.</p>

              <Diagram className="simple-diagram">
                <Step title="HTTP Request" description="GET /products/25" />
                <Arrow />
                <Step title="Routing" description="Selects endpoint" />
                <Arrow />
                <Step title="Endpoint" description="GetProduct()" />
              </Diagram>

              <p>So the better sentence is:</p>

              <blockquote>
                Routing selects the matching endpoint that should handle the
                request.
              </blockquote>
            </Story>

            {/* 05 */}
            <Story
              number="05"
              eyebrow="WHAT IS AN ENDPOINT?"
              title="An endpoint is more than just a URL."
            >
              <p>This was another important part of the investigation.</p>

              <p>
                I initially thought of an endpoint as simply a URL. But an
                endpoint represents a destination that the application can
                execute.
              </p>

              <Diagram className="simple-diagram">
                <Step title="Route" description="/products/{id}" />
                <span>+</span>
                <Step title="HTTP Method" description="GET" />
                <span>+</span>
                <Step title="Handler" description="GetProduct()" />
              </Diagram>

              <p>
                The diagram above is a simplified model rather than a literal
                definition of how an <code>Endpoint</code> object is
                constructed.
              </p>

              <p>
                Conceptually, I can think of an endpoint as something
                containing information such as:
              </p>

              <ul>
                <li>The route pattern</li>
                <li>The HTTP method</li>
                <li>The handler (code) that can execute when the endpoint is selected</li>
                <li>Metadata associated with that endpoint</li>
              </ul>

              <p>For example:</p>

              <pre><code>{`Route: /products/{id}
Method: GET
Handler: ProductController.GetProduct()`}</code></pre>

              <p>
                This gives me a better mental model of what routing is
                actually selecting.
              </p>

              <blockquote>
                Routing does not simply select a URL. It selects an endpoint
                that represents an executable destination for the request.
              </blockquote>
            </Story>

            {/* 06 */}
            <Story
              number="06"
              eyebrow="WHERE DO ENDPOINTS COME FROM?"
              title="The controller action provides routing information."
            >
              <p>Consider:</p>

              <pre><code>{`[HttpGet("products/{id}")]
public IActionResult GetProduct(int id)
{
    ...
}`}</code></pre>

              <p>
                The attribute tells ASP.NET Core important information about
                how this action can be reached.
              </p>

              <p>The route pattern is:</p>

              <pre><code>/products/{"{id}"}</code></pre>

              <p>And the action accepts the HTTP GET method.</p>

              <p>
                So the framework has information associated with this action
                that can eventually be represented as part of an endpoint
                such as:
              </p>

              <pre><code>{`GET /products/{id}
    ↓
ProductController.GetProduct()`}</code></pre>

              <p>
                This does not mean that the controller action itself is the
                endpoint. Rather, the action contributes information that is
                used when the application's endpoint information is built.
              </p>

              <blockquote>
                A controller action provides routing information that can
                become part of an executable endpoint.
              </blockquote>
            </Story>

            {/* 07 */}
            <Story
              number="07"
              eyebrow="APPLICATION STARTUP"
              title="Where does MapControllers() fit into this?"
            >
              <p>
                This connected routing back to something I had already
                learned in Program.cs.
              </p>

              <pre><code>{`var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();`}</code></pre>

              <p>
                I had to be careful not to think that{" "}
                <code>MapControllers()</code> itself contains all the route
                definitions.
              </p>

              <p>
                The controller actions provide routing metadata through their
                attributes. ASP.NET Core can discover that information and
                use <code>MapControllers()</code> to map the controller
                actions into the application's endpoint system.
              </p>

              <Diagram>
                <Step title="Controller Action" description="Route attributes" />
                <Arrow />
                <Step title="Endpoint Mapping" description="MapControllers()" />
                <Arrow />
                <strong>Endpoint Information</strong>
              </Diagram>

              <p>
                At this point, the application has the endpoint information
                that routing can use when requests arrive.
              </p>

              <p>
                But routing has not yet selected an endpoint for a specific
                request. That happens at request time.
              </p>

              <blockquote>
                During application startup, controller actions are mapped into
                the endpoint system. At request time, routing uses that
                endpoint information to select an endpoint.
              </blockquote>
            </Story>

            {/* 08 */}
            <Story
              number="08"
              eyebrow="REQUEST TIME"
              title="Routing uses endpoint information when a request arrives."
            >
              <p>Once the application is running, a request might arrive:</p>

              <pre><code>GET /products/25</code></pre>

              <p>
                Routing now needs to determine which available endpoint
                matches this request.
              </p>

              <Diagram>
                <Step title="GET /products/25" />
                <Arrow />
                <strong>Routing</strong>
                <Arrow />
                <Step title="GET /products/{id}" />
                <Arrow />
                <Step
                  title="ProductController.GetProduct()"
                  description="Endpoint handler"
                />
              </Diagram>

              <p>
                At this point, I can see the difference between what happens
                when the application starts and what happens when an actual
                request arrives.
              </p>

              <ul>
                <li>
                  <strong>Startup:</strong> controller actions are discovered
                  and mapped into the endpoint system.
                </li>
                <li>
                  <strong>Request time:</strong> routing examines the incoming
                  request against the available endpoint information and
                  determines the appropriate endpoint.
                </li>
              </ul>

              <p>But this raises another question.</p>

              <blockquote>
                What happens when more than one endpoint appears to match the
                request?
              </blockquote>
            </Story>

            {/* 09 */}
            <Story
              number="09"
              eyebrow="CANDIDATE ENDPOINTS"
              title="Routing doesn't immediately jump to one action."
            >
              <p>
                This was another part of my mental model that needed
                correction.
              </p>

              <p>
                It is better to think of routing as examining the available
                endpoints for the incoming request.
              </p>

              <p>
                The routing process then uses things such as the route
                pattern, constraints, and HTTP method requirements to
                determine which candidate is valid and should be selected.
              </p>

              <Diagram>
                <Step title="Incoming Request" />
                <Arrow />
                <Step title="Candidate Endpoints" description="Possible matches" />
                <Arrow />
                <Step title="Routing Rules" description="Route / Constraints / HTTP Method" />
                <Arrow />
                <strong>Selected Endpoint</strong>
              </Diagram>

              <p>So I should not imagine routing as:</p>

              <pre><code>"Find something that looks close enough and use it."</code></pre>

              <p>Instead, I should think of it as:</p>

              <pre><code>"Examine the possible candidates and select the endpoint that validly matches the request."</code></pre>

              <p>
                This also explains why routing needs more information than
                just the URL path.
              </p>

              <p>
                For example, these two endpoints could have the same route
                path but accept different HTTP methods:
              </p>

              <pre><code>{`[HttpGet("products")]
GetProducts()

[HttpPost("products")]
CreateProduct()`}</code></pre>

              <p>
                The request's HTTP method therefore matters when determining
                which endpoint can handle the request.
              </p>

              <blockquote>
                Routing examines possible endpoint candidates and uses the
                request and endpoint metadata to determine which endpoint
                should be selected.
              </blockquote>
            </Story>

            {/* 10 */}
            <Story
              number="10"
              eyebrow="HTTP METHOD"
              title="The path alone isn't enough."
            >
              <p>Consider:</p>

              <pre><code>{`[HttpGet("products")]
public IActionResult GetProducts()
{
    ...
}

[HttpPost("products")]
public IActionResult CreateProduct(Product product)
{
    ...
}`}</code></pre>

              <p>Both actions use the same path:</p>

              <pre><code>/products</code></pre>

              <p>But they accept different HTTP methods.</p>

              <Diagram className="simple-diagram">
                <Step title="GET /products" description="GetProducts()" />
                <span>vs</span>
                <Step title="POST /products" description="CreateProduct()" />
              </Diagram>

              <p>
                Therefore, the HTTP method is one of the important pieces of
                information routing uses when determining which endpoint can
                handle a request.
              </p>

              <p>
                The same path can therefore lead to different endpoints
                depending on the HTTP method.
              </p>

              <blockquote>
                The path alone isn't enough. The HTTP method also matters when
                determining which endpoint can handle the request.
              </blockquote>
            </Story>

            {/* 11 */}
            <Story
              number="11"
              eyebrow="LITERAL VS PARAMETER ROUTES"
              title="What happens when two routes appear to match?"
            >
              <p>Consider:</p>

              <pre><code>{`[HttpGet("products/all")]
public IActionResult GetAll()
{
    ...
}

[HttpGet("products/{id}")]
public IActionResult GetProduct(int id)
{
    ...
}`}</code></pre>

              <p>Now the request is:</p>

              <pre><code>GET /products/all</code></pre>

              <p>At first glance, both routes seem capable of matching:</p>

              <pre><code>{`/products/all
/products/{id}`}</code></pre>

              <p>
                The reason the second route can appear to match is that{" "}
                <code>{"{id}"}</code> is a route parameter, so without any
                constraint it can match the value <code>all</code> as well.
              </p>

              <p>But they are not equally specific.</p>

              <p>The first route contains a literal segment:</p>

              <pre><code>/products/all</code></pre>

              <p>The second route contains a parameter segment:</p>

              <pre><code>/products/{"{id}"}</code></pre>

              <p>
                The literal route has higher route precedence than the
                parameter route for this request.
              </p>

              <Diagram className="simple-diagram">
                <Step title="/products/all" description="Literal" />
                <span>&gt;</span>
                <Step title="/products/{id}" description="Parameter" />
              </Diagram>

              <p>Therefore:</p>

              <pre><code>{`GET /products/all
    ↓
GetAll()`}</code></pre>

              <p>
                This is an example of <strong>route precedence</strong>: when
                multiple route patterns can match, the more specific route
                can take precedence over a more general route.
              </p>

              <p>
                This corrected another terminology mistake in my thinking: I
                should say <strong>literal route</strong>, not "linear route."
              </p>

              <blockquote>
                A literal route is more specific than a parameter route, so
                it can take precedence when both patterns match the request.
              </blockquote>
            </Story>

            {/* 12 */}
            <Story
              number="12"
              eyebrow="ROUTE CONSTRAINTS"
              title="A route parameter can have constraints."
            >
              <p>Consider:</p>

              <pre><code>{`[HttpGet("products/{id:int}")]
public IActionResult GetProduct(int id)
{
    ...
}`}</code></pre>

              <p>
                The <code>:int</code> part is a route constraint. It says that
                the route value for <code>id</code> must satisfy the integer
                constraint for this route to be considered a match.
              </p>

              <p>Therefore:</p>

              <pre><code>GET /products/25</code></pre>

              <p>satisfies the constraint.</p>

              <p>But:</p>

              <pre><code>GET /products/abc</code></pre>

              <p>does not satisfy the integer constraint.</p>

              <Diagram className="simple-diagram">
                <Step title="/products/25" description="int constraint passes" />
                <span>→</span>
                <Step title="GET endpoint" description="Candidate remains valid" />
              </Diagram>

              <Diagram className="simple-diagram">
                <Step title="/products/abc" description="int constraint fails" />
                <span>→</span>
                <Step title="GET endpoint" description="Not a matching candidate" />
              </Diagram>

              <p>
                An important detail is that the <code>:int</code> constraint
                is part of routing. It helps determine whether this route can
                match the incoming request.
              </p>

              <p>
                It should not be confused with model binding. The constraint
                does not mean that routing has already converted the route
                value into a C# <code>int</code>.
              </p>

              <blockquote>
                A route constraint restricts which values can match a route.
                It helps routing determine whether an endpoint is a valid
                candidate.
              </blockquote>
            </Story>

            {/* 13 */}
            <Story
              number="13"
              eyebrow="CONSTRAINTS VS MODEL BINDING"
              title="This is where routing and model binding must be separated."
            >
              <p>Consider:</p>

              <pre><code>{`[HttpGet("products/{id}")]
public IActionResult GetProduct(int id)
{
    ...
}`}</code></pre>

              <p>And:</p>

              <pre><code>GET /products/abc</code></pre>

              <p>
                The route pattern can match this path because{" "}
                <code>{"{id}"}</code> does not have an integer constraint.
              </p>

              <p>
                Routing can therefore select the endpoint and produce a route
                value conceptually like:
              </p>

              <pre><code>id = "abc"</code></pre>

              <p>But the action requires:</p>

              <pre><code>int id</code></pre>

              <p>
                Model binding now has the responsibility of preparing the
                action parameter. It attempts to provide the incoming value
                in the type expected by the action.
              </p>

              <pre><code>"abc" → int</code></pre>

              <p>
                The conversion cannot succeed because <code>"abc"</code> is
                not a valid integer value.
              </p>

              <p>Now compare this with:</p>

              <pre><code>{`[HttpGet("products/{id:int}")]
public IActionResult GetProduct(int id)
{
    ...
}`}</code></pre>

              <p>In this case, the request:</p>

              <pre><code>GET /products/abc</code></pre>

              <p>
                fails the <code>int</code> route constraint during routing.
                Therefore, this endpoint is not considered a valid match for
                the request.
              </p>

              <Diagram>
                <Step title="/products/{id}" description="No int constraint" />
                <Arrow />
                <Step title="Routing" description="Endpoint can match" />
                <Arrow />
                <Step title="Model Binding" description='"abc" → int' />
              </Diagram>

              <Diagram>
                <Step title="/products/{id:int}" description="int constraint" />
                <Arrow />
                <Step title="Routing" description="Constraint fails" />
                <Arrow />
                <strong>Endpoint not selected</strong>
              </Diagram>

              <blockquote>
                A route constraint can eliminate an endpoint during routing.
                Model binding can fail later while preparing the action
                parameter.
              </blockquote>
            </Story>

            {/* 14 */}
            <Story
              number="14"
              eyebrow="ANOTHER EXAMPLE"
              title="A general route can compete with a constrained route."
            >
              <p>Suppose we have:</p>

              <pre><code>{`[HttpGet("products/{id:int}")]
public IActionResult GetById(int id)
{
    ...
}

[HttpGet("products/{name}")]
public IActionResult GetByName(string name)
{
    ...
}`}</code></pre>

              <p>Now consider this request:</p>

              <pre><code>GET /products/25</code></pre>

              <p>
                Both route patterns can initially appear capable of matching
                this path.
              </p>

              <pre><code>{`/products/{id:int}
/products/{name}`}</code></pre>

              <p>
                But the first endpoint has an integer constraint, and{" "}
                <code>25</code> satisfies that constraint.
              </p>

              <p>
                The constraint narrows the values that can match that endpoint.
              </p>

              <Diagram>
                <Step title="/products/25" />
                <Arrow />
                <Step title="Candidate Endpoints" />
                <Arrow />
                <Step title="/products/{id:int}" description="Constraint passes" />
              </Diagram>

              <p>Now change the request:</p>

              <pre><code>GET /products/abc</code></pre>

              <p>
                The <code>:int</code> constraint fails because{" "}
                <code>abc</code> is not an integer.
              </p>

              <p>
                That endpoint is therefore eliminated as a matching
                candidate.
              </p>

              <p>
                The general route does not have an integer constraint, so it
                can still match:
              </p>

              <pre><code>{`/products/{name}
        ↓
name = "abc"`}</code></pre>

              <Diagram>
                <Step title="/products/abc" />
                <Arrow />
                <Step title="/products/{id:int}" description="Constraint fails" />
                <span>×</span>
                <Step title="/products/{name}" description="Valid candidate" />
              </Diagram>

              <p>
                So the result depends on the value in the incoming request.
                The constrained route can match integer values, while the
                general parameter route can match values that do not satisfy
                the integer constraint.
              </p>

              <blockquote>
                A route constraint narrows which values can match an
                endpoint. If the constraint fails, that endpoint is removed
                from consideration for that request.
              </blockquote>
            </Story>

            {/* 15 */}
            <Story
              number="15"
              eyebrow="AMBIGUITY"
              title="What happens when multiple endpoints remain equally valid?"
            >
              <p>Consider:</p>

              <pre><code>{`[HttpGet("products/{id}")]
public IActionResult GetById(string id)
{
    ...
}

[HttpGet("products/{code}")]
public IActionResult GetByCode(string code)
{
    ...
}`}</code></pre>

              <p>Now:</p>

              <pre><code>GET /products/25</code></pre>

              <p>Both routes have the same structure:</p>

              <pre><code>{`/products/{id}
/products/{code}`}</code></pre>

              <p>
                The parameter names do not make one route more specific than
                the other.
              </p>

              <p>
                Both endpoints can therefore remain valid candidates for the
                same request.
              </p>

              <Diagram className="simple-diagram">
                <Step title="Endpoint A" description="/products/{id}" />
                <span>+</span>
                <Step title="Endpoint B" description="/products/{code}" />
                <span>→</span>
                <strong>Ambiguous match</strong>
              </Diagram>

              <p>
                ASP.NET Core should not randomly choose between these
                endpoints because the routing information does not provide a
                clear way to determine which one was intended.
              </p>

              <p>
                Instead, the framework treats this as an ambiguous match
                rather than silently selecting one of the actions.
              </p>

              <p>This is different from the earlier examples.</p>

              <pre><code>{`/products/all
    ↓
More specific route`}</code></pre>

              <p>
                In that example, route precedence provided a distinction.
                Here, both route patterns have the same structure, so the
                parameter names alone do not provide that distinction.
              </p>

              <p>
                This taught me another useful architectural principle:
              </p>

              <blockquote>
                When the framework cannot determine the intended destination,
                it should not silently guess.
              </blockquote>
            </Story>

            {/* 16 */}
            <Story
              number="16"
              eyebrow="ROUTE PARAMETERS"
              title="What exactly happens to the value in the URL?"
            >
              <p>
                Until this point, I understood that routing can match a
                request and select an endpoint. But another question
                appeared:
              </p>

              <blockquote>
                What actually happens to the value <code>25</code> in{" "}
                <code>/products/25</code>?
              </blockquote>

              <p>Consider:</p>

              <pre><code>{`[HttpGet("products/{id}")]
public IActionResult GetProduct(int id)
{
    ...
}`}</code></pre>

              <p>And the incoming request:</p>

              <pre><code>GET /products/25</code></pre>

              <p>
                The <code>{"{id}"}</code> in the route template is a route
                parameter, or placeholder.
              </p>

              <pre><code>{`/products/{id}
          ↑
      placeholder`}</code></pre>

              <p>When the actual request arrives:</p>

              <pre><code>/products/25</code></pre>

              <p>
                The route parameter matches the corresponding value in the
                URL.
              </p>

              <Diagram>
                <Step title="/products/25" />
                <Arrow />
                <Step title="/products/{id}" />
                <Arrow />
                <Step title="Route value" description='id = "25"' />
              </Diagram>

              <p>
                Conceptually, routing can provide a route value like:
              </p>

              <pre><code>id = "25"</code></pre>

              <p>That is an important distinction.</p>

              <p>
                The route value is not automatically the same thing as the
                C# action parameter:
              </p>

              <pre><code>{`Route value
id = "25"

C# action parameter
int id`}</code></pre>

              <p>
                At this point, routing has done its job of matching the
                request and selecting the endpoint. The next question is how
                the route value eventually becomes the value required by the
                action parameter.
              </p>

              <blockquote>
                Routing can provide route values from the matched URL.
                Preparing those values for the action parameter is a
                separate responsibility.
              </blockquote>
            </Story>

            {/* 17 */}
            <Story
              number="17"
              eyebrow="ROUTING VS MODEL BINDING"
              title="Routing does not directly create the C# action parameter."
            >
              <p>
                This was probably the most important correction in my mental
                model.
              </p>

              <Diagram>
                <Step title="GET /products/25" />
                <Arrow />
                <strong>Routing</strong>
                <Arrow />
                <Step title="Route value" description='id = "25"' />
                <Arrow />
                <strong>Model Binding</strong>
                <Arrow />
                <Step title="int id = 25" />
              </Diagram>

              <p>
                Routing's responsibility is to match the request against
                endpoint information and select an endpoint. It can also
                produce route values from the matched route.
              </p>

              <p>
                Model binding then uses request data, including route values,
                to prepare the parameters required by the selected action.
              </p>

              <p>
                So the value in the URL and the C# parameter are related, but
                they are not the same thing.
              </p>

              <pre><code>{`URL value
    ↓
   "25"
    ↓
Model Binding
    ↓
int id = 25`}</code></pre>

              <p>
                This distinction becomes even more useful when the action
                receives values from different parts of the request, such as
                route values, query string values, or the request body.
              </p>

              <blockquote>
                Routing selects the destination. Model binding prepares the
                inputs.
              </blockquote>
            </Story>

            {/* 18 */}
            <Story
              number="18"
              eyebrow="QUERY STRING"
              title="Not all action parameters come from the route."
            >
              <p>This raised another question:</p>

              <blockquote>
                What happens when some data comes from the route and some
                data comes from somewhere else in the request?
              </blockquote>

              <p>Consider:</p>

              <pre><code>{`[HttpGet("products/{id}")]
public IActionResult GetProduct(int id, string sortBy)
{
    ...
}`}</code></pre>

              <p>Request:</p>

              <pre><code>GET /products/25?sortBy=price</code></pre>

              <p>There are now two different pieces of request data.</p>

              <Diagram className="simple-diagram">
                <Step title="/products/25" description="Route" />
                <span>+</span>
                <Step title="?sortBy=price" description="Query string" />
              </Diagram>

              <p>
                The route value and query string value come from different
                parts of the request.
              </p>

              <pre><code>{`Route value:
id = "25"

Query string:
sortBy = "price"`}</code></pre>

              <p>
                The query string is not part of the route template{" "}
                <code>/products/{"{id}"}</code>. It is additional request data
                that can also be used by model binding.
              </p>

              <pre><code>{`int id = 25
string sortBy = "price"`}</code></pre>

              <Diagram>
                <Step title="Route" description='id = "25"' />
                <span>+</span>
                <Step title="Query String" description='sortBy = "price"' />
                <Arrow />
                <strong>Model Binding</strong>
                <Arrow />
                <Step title="Action Parameters" description='id = 25, sortBy = "price"' />
              </Diagram>

              <blockquote>
                Route values and query string values are different sources of
                request data, and model binding can use both to prepare
                action parameters.
              </blockquote>
            </Story>

            {/* 19 */}
            <Story
              number="19"
              eyebrow="EXPLICIT SOURCES"
              title="We can explicitly tell model binding where a value comes from."
            >
              <p>
                ASP.NET Core provides attributes such as:
              </p>

              <pre><code>{`[FromRoute]
[FromQuery]
[FromBody]`}</code></pre>

              <p>For example:</p>

              <pre><code>{`[HttpGet("products/{id}")]
public IActionResult GetProduct(
    [FromRoute] int id,
    [FromQuery] string sortBy)
{
    ...
}`}</code></pre>

              <p>This makes the intended sources explicit:</p>

              <pre><code>{`id → route
sortBy → query string`}</code></pre>

              <p>
                We can also explicitly tell model binding to get a value from
                the request body:
              </p>

              <pre><code>[FromBody] Product product</code></pre>

              <p>
                So these attributes can make the source of an action parameter
                explicit:
              </p>

              <Diagram>
                <Step title="[FromRoute]" description="Route values" />
                <span>+</span>
                <Step title="[FromQuery]" description="Query string" />
                <span>+</span>
                <Step title="[FromBody]" description="Request body" />
                <Arrow />
                <strong>Model Binding</strong>
              </Diagram>

              <p>
                An important detail is that these attributes are primarily
                about <strong>model binding</strong>, not about telling
                routing which endpoint to select.
              </p>

              <p>
                Routing still uses information such as the route pattern and
                HTTP method to determine which endpoint can handle the
                request.
              </p>

              <blockquote>
                Routing selects the endpoint. Model binding determines where
                the action's input values come from and prepares them for the
                action parameters.
              </blockquote>
            </Story>

            {/* 20 */}
            <Story
              number="20"
              eyebrow="COMPLEX OBJECTS"
              title="Routing can select the action, but the action may need much more data."
            >
              <p>Consider a POST request:</p>

              <pre><code>{`[HttpPost("products")]
public IActionResult CreateProduct(Product product)
{
    ...
}`}</code></pre>

              <p>The request might contain:</p>

              <pre><code>{`POST /products

Content-Type: application/json

{
    "name": "Laptop",
    "price": 500000
}`}</code></pre>

              <p>There is no product information in the route.</p>

              <p>
                The route only tells ASP.NET Core that this is a{" "}
                <strong>POST /products</strong> request.
              </p>

              <p>
                Routing's job is to determine which endpoint can handle this
                request.
              </p>

              <p>The request body is a separate concern.</p>

              <Diagram>
                <Step title="POST /products" description="Request" />
                <Arrow />
                <strong>Routing</strong>
                <Arrow />
                <Step title="CreateProduct()" description="Selected endpoint" />
                <Arrow />
                <strong>Model Binding</strong>
                <Arrow />
                <Step title="Product" description="Request body data" />
              </Diagram>

              <p>
                The request body contains JSON, but the action expects a C#{" "}
                <code>Product</code> object.
              </p>

              <p>
                For a JSON request body, ASP.NET Core uses an appropriate{" "}
                <strong>input formatter</strong> to deserialize the JSON into
                the expected complex type.
              </p>

              <pre><code>{`JSON
  ↓
Input Formatter
  ↓
Product object
  ↓
CreateProduct(Product product)`}</code></pre>

              <p>
                So the routing process does not need to understand the
                product's properties such as <code>name</code> or{" "}
                <code>price</code>.
              </p>

              <p>
                Routing selects the endpoint. Model binding, together with
                the appropriate input formatter for a JSON body, prepares the
                data required by the action.
              </p>

              <blockquote>
                Routing selects the destination. The request body is handled
                separately and can be deserialized into a complex object for
                the selected action.
              </blockquote>
            </Story>

            {/* 21 */}
            <Story
              number="21"
              eyebrow="ROUTING AND MODEL BINDING TOGETHER"
              title="Different request data can prepare different action parameters."
            >
              <p>Consider:</p>

              <pre><code>{`[HttpPut("products/{id}")]
public IActionResult UpdateProduct(
    [FromRoute] int id,
    [FromBody] Product product)
{
    ...
}`}</code></pre>

              <p>Request:</p>

              <pre><code>{`PUT /products/25

{
    "name": "Laptop",
    "price": 900000
}`}</code></pre>

              <p>Now the responsibilities are very clear:</p>

              <pre><code>{`25
↓
Route value
↓
[FromRoute] int id


JSON body
↓
Input formatter / deserialization
↓
[FromBody] Product product`}</code></pre>

              <p>The action eventually receives both:</p>

              <pre><code>{`id = 25
product.Name = "Laptop"
product.Price = 900000`}</code></pre>
            </Story>

            {/* 22 */}
            <Story
              number="22"
              eyebrow="VALIDATION"
              title="Successfully binding a value does not mean the value is valid."
            >
              <p>
                This distinction became clear when looking at a product price.
              </p>

              <pre><code>{`{
    "name": "Laptop",
    "price": -50000
}`}</code></pre>

              <p>
                If the JSON can be successfully deserialized into a{" "}
                <code>Product</code>, binding may succeed.
              </p>

              <p>
                The value <code>-50000</code> is still a valid numeric value,
                so there may be no problem converting it into the expected C#
                type.
              </p>

              <p>
                But the application can still decide that a negative price is
                invalid.
              </p>

              <Diagram>
                <Step title="JSON" description="Incoming data" />
                <Arrow />
                <Step title="Binding" description="Can I provide the action parameter?" />
                <Arrow />
                <Step title="Validation" description="Is the resulting data acceptable?" />
              </Diagram>

              <p>This gave me another useful distinction.</p>

              <pre><code>{`"price": -50000
    ↓
Binding
    ↓
Product.Price = -50000
    ↓
Validation
    ↓
Invalid: price cannot be negative`}</code></pre>

              <p>
                The important point is that binding and validation answer
                different questions.
              </p>

              <blockquote>
                Binding asks whether incoming data can be provided in the
                required form. Validation asks whether the resulting data is
                acceptable.
              </blockquote>
            </Story>

            {/* 23 */}
            <Story
              number="23"
              eyebrow="THE COMPLETE REQUEST FLOW"
              title="Routing finally made sense when I connected it to everything before and after it."
            >
              <p>A request such as:</p>

              <pre><code>{`PUT /products/25

Content-Type: application/json

{
    "name": "Laptop",
    "price": 50000
}`}</code></pre>

              <p>
                travels through several different responsibilities.
              </p>

              <Diagram>
                <Step title="Browser" description="Sends request" />
                <Arrow />
                <strong>Kestrel</strong>
                <Arrow />
                <strong>ASP.NET Core Request Pipeline</strong>
                <Arrow />
                <Step title="Routing" description="Selects an endpoint" />
                <Arrow />
                <Step title="Selected Endpoint" description="PUT /products/{id}" />
                <Arrow />
                <Step title="Model Binding" description="Prepares action inputs" />
                <Arrow />
                <Step title="Validation" description="Checks whether data is acceptable" />
                <Arrow />
                <Step title="Controller Action" description="Application behavior" />
              </Diagram>

              <p>Each part of this flow has a different responsibility.</p>

              <ul>
                <li>
                  <strong>Kestrel</strong> receives the HTTP request.
                </li>
                <li>
                  <strong>Middleware</strong> in the ASP.NET Core request
                  pipeline can process the request as it moves through the
                  application.
                </li>
                <li>
                  <strong>Routing</strong> examines the request and the
                  available endpoint information to determine which endpoint
                  can handle it.
                </li>
                <li>
                  <strong>Model binding</strong> prepares the values needed by
                  the selected action from request data such as route values,
                  query string values, and the request body.
                </li>
                <li>
                  <strong>Validation</strong> checks whether the resulting
                  data satisfies the application's validation rules.
                </li>
                <li>
                  The <strong>controller action</strong> executes the
                  application behavior.
                </li>
              </ul>

              <p>For this particular request, the route values from:</p>

              <pre><code>{`/products/25
    ↓
id = "25"`}</code></pre>

              <p>The JSON body provides the product data:</p>

              <pre><code>{`{
    "name": "Laptop",
    "price": 50000
}`}</code></pre>

              <p>
                Model binding can then prepare the inputs required by the
                selected action.
              </p>

              <pre><code>{`id      → 25
product → Product object`}</code></pre>

              <p>
                Only after these responsibilities have been handled does the
                controller action receive the data it needs to perform its
                application behavior.
              </p>

              <blockquote>
                A request is not handled by one single component. Different
                parts of ASP.NET Core are responsible for receiving the
                request, processing it, selecting the endpoint, preparing its
                inputs, validating the data, and finally executing the
                application behavior.
              </blockquote>
            </Story>

            {/* 24 */}
            <Story
              number="24"
              eyebrow="RESPONSIBILITY BOUNDARIES"
              title="Each part has a different responsibility."
            >
              <div className="concept-grid">
                <div className="concept-card">
                  <h3>Kestrel</h3>
                  <p>
                    Handles the web-server side of communication: accepting
                    network connections, receiving HTTP requests, and sending
                    HTTP responses.
                  </p>
                </div>

                <div className="concept-card">
                  <h3>Middleware</h3>
                  <p>
                    Processes requests and responses through the ASP.NET Core
                    request pipeline and handles cross-cutting concerns.
                  </p>
                </div>

                <div className="concept-card">
                  <h3>Routing</h3>
                  <p>
                    Examines the incoming request and available endpoint
                    information to select an endpoint.
                  </p>
                </div>

                <div className="concept-card">
                  <h3>Model Binding</h3>
                  <p>
                    Prepares action parameters from request data such as route
                    values, query strings, and request bodies.
                  </p>
                </div>

                <div className="concept-card">
                  <h3>Validation</h3>
                  <p>
                    Determines whether the bound data satisfies the
                    application's validation rules.
                  </p>
                </div>

                <div className="concept-card">
                  <h3>Controller Action</h3>
                  <p>
                    Executes application behavior after the required endpoint
                    and inputs have been determined.
                  </p>
                </div>
              </div>
            </Story>

            {/* 25 */}
            <Story
              number="25"
              eyebrow="MY CURRENT MENTAL MODEL"
              title="Routing is not the whole request. It is one responsibility in the journey."
            >
              <p>My mental model now looks like this:</p>

              <Diagram className="simple-diagram">
                <Step title="Kestrel" description="Receives HTTP request" />
                <Arrow />
                <Step title="Middleware" description="Processes request" />
                <Arrow />
                <Step title="Routing" description="Selects endpoint" />
                <Arrow />
                <Step title="Model Binding" description="Prepares parameters" />
                <Arrow />
                <Step title="Validation" description="Checks validity" />
                <Arrow />
                <Step title="Controller Action" description="Executes behavior" />
              </Diagram>

              <p>
                The important thing is not memorizing this as a sequence of
                words.
              </p>

              <p>
                I want to remember{" "}
                <strong>why each responsibility exists</strong> and what it
                should not be responsible for.
              </p>

              <p>For example:</p>

              <Diagram className="story-diagram">
                <Step title="Routing" description="Selects the endpoint" />
                <span>≠</span>
                <Step title="Model Binding" description="Prepares the inputs" />
                <span>≠</span>
                <Step title="Validation" description="Checks whether data is acceptable" />
                <span>≠</span>
                <Step title="Controller Action" description="Executes application behavior" />
              </Diagram>

              <blockquote>
                Understanding the boundary between responsibilities is more
                useful than memorizing the names of framework components.
              </blockquote>
            </Story>

            {/* 26 - INTERVIEW DEPTH */}
            <Story
              number="26"
              eyebrow="INTERVIEW DEPTH"
              title="Can I explain routing without memorizing a definition?"
              className="interview-depth"
            >
              <p>
                If I were asked about routing in an interview, I should be
                able to reason through the request rather than simply recite a
                definition.
              </p>

              <h3>What is routing?</h3>
              <p>
                Routing is the mechanism that matches an incoming HTTP request
                against the application's endpoint information and selects
                the endpoint that should handle the request.
              </p>

              <h3>Does routing select a controller?</h3>
              <p>
                More precisely, routing selects an endpoint. In a
                controller-based application, that endpoint can ultimately
                invoke a controller action.
              </p>

              <h3>What is an endpoint?</h3>
              <p>
                An endpoint represents an executable destination in the
                application, along with information such as its route
                pattern, HTTP method, and metadata.
              </p>

              <h3>What happens if two routes match?</h3>
              <p>
                ASP.NET Core evaluates the available candidates using things
                such as HTTP method, constraints, and route precedence. If
                one valid candidate can be distinguished from the others, it
                can be selected. If equally valid candidates remain
                ambiguous, the framework does not simply guess.
              </p>

              <h3>What is a route constraint?</h3>
              <p>
                A route constraint restricts whether a route parameter value
                can make an endpoint a valid candidate during routing.
              </p>

              <h3>What is the difference between routing and model binding?</h3>
              <p>
                Routing determines the endpoint and can produce route values.
                Model binding then uses request data to prepare the
                parameters required by that endpoint's action.
              </p>

              <h3>Does routing convert "25" into int 25?</h3>
              <p>
                Not as its primary responsibility. Routing produces route
                information and values. Model binding is responsible for
                preparing the action parameter and performing the necessary
                conversion.
              </p>

              <h3>What happens when a route constraint fails?</h3>
              <p>
                That endpoint is not considered a valid candidate for that
                request.
              </p>

              <h3>What happens when model binding fails?</h3>
              <p>
                The endpoint may already have been selected, but the framework
                cannot successfully provide the expected action parameter
                from the incoming request data.
              </p>

              <div className="question-box">
                <p className="eyebrow">INTERVIEW CHECK</p>

                <h3>Can I reason through this request?</h3>

                <pre><code>{`PUT /products/25?notify=true

{
    "name": "Laptop",
    "price": 50000
}`}</code></pre>

                <p>Given:</p>

                <pre><code>{`[HttpPut("products/{id}")]
public IActionResult Update(
    [FromRoute] int id,
    [FromQuery] bool notify,
    [FromBody] Product product)
{
    ...
}`}</code></pre>

                <p>I should now be able to explain:</p>

                <ul>
                  <li>Kestrel receives the HTTP request.</li>
                  <li>
                    The request enters the ASP.NET Core pipeline.
                  </li>
                  <li>
                    Routing examines the request and selects the matching
                    PUT endpoint.
                  </li>
                  <li>
                    The route produces the value <code>id = "25"</code>.
                  </li>
                  <li>
                    Model binding prepares <code>int id = 25</code>.
                  </li>
                  <li>
                    Model binding gets <code>notify</code> from the query
                    string.
                  </li>
                  <li>
                    The request body is deserialized and bound into the{" "}
                    <code>Product</code> object.
                  </li>
                  <li>
                    Validation can then determine whether the resulting data
                    is acceptable.
                  </li>
                  <li>
                    The controller action executes with the prepared
                    parameters.
                  </li>
                </ul>
              </div>
            </Story>

            {/* NEXT QUESTION */}
            <div className="next-question">
              <p className="eyebrow">NEXT QUESTION</p>

              <h2>
                The endpoint has been selected. But who creates the
                controller?
              </h2>

              <p>
                Routing answered where the request should go. Model binding
                answered how request data becomes action parameters.
              </p>

              <p>But another question is waiting:</p>

              <blockquote>
                When ASP.NET Core decides to execute a controller action, who
                actually creates the controller object and supplies its
                dependencies?
              </blockquote>

              <span>
                Continue to Controller Activation &amp; Dependency Injection →
              </span>
            </div>

          </article>
        </div>
      </section>
    </main>
  )
}

export default Routing
