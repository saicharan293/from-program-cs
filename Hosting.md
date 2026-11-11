# Hosting From Program.cs on AWS

This guide explains how I hosted the **From Program.cs** React + Vite
website using Amazon S3 and Amazon CloudFront.

The steps are written for someone doing this for the first time. Follow
them in order, and check each step before moving on.

------------------------------------------------------------------------

## 1. Understand what we are building

Our website is a React application. After we build it, it becomes a
collection of static files:

-   `index.html`
-   JavaScript files
-   CSS files
-   Images and other assets

We do not need a server such as an EC2 virtual machine for this website.

We use two AWS services:

  -----------------------------------------------------------------------
  AWS service                         What it does
  ----------------------------------- -----------------------------------
  **Amazon S3**                       Stores the website files.

  **Amazon CloudFront**               Delivers those files to visitors
                                      over HTTPS and caches them around
                                      the world.
  -----------------------------------------------------------------------

The request flow looks like this:

``` text
Visitor's browser
       |
       v
Amazon CloudFront
(HTTPS, caching, global delivery)
       |
       v
Private Amazon S3 bucket
(HTML, CSS, JavaScript, images)
```

**Important:** S3 stores the files. CloudFront delivers the files. They
have different jobs.

## 2. Check your AWS account and Free plan

1.  Sign in to the [AWS Management
    Console](https://console.aws.amazon.com/).
2.  Open **Billing and Cost Management**.
3.  Open the Free Tier or credits section.
4.  Check your account plan, available credits, and their expiry date.

In this deployment, the account was on the AWS **Free plan** and had
\$100 in credits.

### Region restriction we encountered

The account assigned the project to **Asia Pacific (Sydney) ---
`ap-southeast-2`**. AWS displayed a message saying that access to other
commercial regions required upgrading the plan and activating advanced
features.

We stayed on Sydney. That is fine for this project: CloudFront can still
deliver the website to visitors in India and elsewhere.

**Do not upgrade your plan just to choose a different S3 region.** Check
the plan and current AWS terms in your own account before enabling paid
features.

## 3. Create the S3 bucket

An S3 bucket is a container for files. Think of it as the storage
location for the published website.

1.  Open the [Amazon S3
    Console](https://s3.console.aws.amazon.com/s3/home).

2.  Select **Create bucket**.

3.  Choose the region available to your account. In our deployment, this
    was:

    -   **Asia Pacific (Sydney)**
    -   `ap-southeast-2`

4.  Choose **General purpose** as the bucket type.

5.  Enter a globally unique bucket name. Our bucket was named:

    ``` text
    amzn-deom
    ```

    Bucket names must be unique across AWS, so another user may already
    have taken the name you want.

6.  Keep **Object Ownership** set to ACLs disabled.

7.  Keep all four **Block Public Access** options enabled.

8.  Leave bucket versioning disabled for this simple deployment.

9.  Keep default encryption enabled.

10. Create the bucket.

### Why keep the bucket private?

We do not want visitors accessing S3 objects directly. CloudFront will
be allowed to read the files through Origin Access Control (OAC). This
keeps the bucket private while still allowing the public website to work
through CloudFront.

**Do not turn off Block Public Access or make the bucket public to fix
an access error.**

## 4. Build the React project

Before uploading anything, create the production build on your computer.

1.  Open the `from-program-cs` project folder in VS Code or a terminal.

2.  Run:

    ``` bash
    npm run build
    ```

3.  Vite creates a folder named `dist`.

The folder contains the optimized files that should be deployed. Do not
upload your whole source project, `node_modules`, or `.git` folder.

A typical build looks like this:

``` text
from-program-cs/
├── src/
├── public/
├── package.json
├── index.html
└── dist/
    ├── index.html
    └── assets/
        ├── index-xxxxx.js
        └── index-xxxxx.css
```

The exact generated JavaScript and CSS filenames will be different for
each build.

## 5. Upload the contents of `dist` to S3

1.  Open S3 and select your bucket.
2.  Open the **Objects** tab.
3.  Click **Upload**.
4.  Click **Add files** and **Add folder**, or select the files and
    folders inside your local `dist` folder.
5.  Upload the contents of `dist` to the bucket's root.

### This detail is very important

Upload the **contents inside `dist`**, not the `dist` folder itself.

Correct S3 layout:

``` text
amzn-deom/
├── index.html
└── assets/
    ├── index-xxxxx.js
    └── index-xxxxx.css
```

Incorrect layout:

``` text
amzn-deom/
└── dist/
    ├── index.html
    └── assets/
```

Why? CloudFront will look for `/index.html` and `/assets/...`. If the
files are nested under `/dist`, those requested paths will not match.

After uploading, check that `index.html` is directly visible in the
bucket's **Objects** list.

## 6. Create a CloudFront distribution

CloudFront is the service that makes the S3 website available to
visitors.

1.  Open the [CloudFront
    Console](https://console.aws.amazon.com/cloudfront/v4/home).

2.  Click **Create distribution**.

3.  Enter a distribution name, for example:

    ``` text
    from-program-cs-website
    ```

4.  Skip the custom domain setup if you do not own or want to configure
    a domain yet.

5.  Choose **Amazon S3** as the origin type.

6.  Under **Origin**, click **Browse S3** and select your bucket.

7.  Leave **Origin path** empty.

### Allow private S3 access

Under the origin settings, keep this option enabled:

**Allow private S3 bucket access to CloudFront**

This lets CloudFront configure the S3 bucket policy so the distribution
can read objects without making the bucket public.

The resulting bucket policy should grant the CloudFront service
principal `s3:GetObject` access to the bucket objects, restricted to the
ARN of your distribution.

Do not manually make the bucket public.

### Cache settings

For a basic static Vite website, the default cache settings recommended
by CloudFront for an S3 origin are a reasonable starting point.

### Web Application Firewall (WAF)

For this small, static, frontend-only website, we chose **Do not enable
security protections** during initial setup. WAF is an additional
service and may introduce charges. This is not a recommendation to
disable security for every application; review security needs before
deploying a site that handles sensitive data or user accounts.

Review the configuration and pricing information shown in your AWS
account before creating the distribution. Then click **Create
distribution**.

## 7. Wait for CloudFront deployment

After creation, CloudFront may show a status such as **Deploying**.

1.  Wait for the distribution status to become **Enabled** and for
    deployment to finish.
2.  Open the distribution's **General** tab.
3.  Copy the **Distribution domain name**.

It will look similar to:

``` text
https://dxxxxxxxxxxxxx.cloudfront.net
```

CloudFront provides this default domain, so a custom domain is not
required for the initial deployment.

## 8. Set the default root object

A visitor opening the CloudFront domain requests `/`. CloudFront needs
to know which file to return for the root path.

1.  Open the CloudFront distribution.

2.  Go to **General**.

3.  Open **Settings** and click **Edit**.

4.  Set **Default root object** to:

    ``` text
    index.html
    ```

5.  Do not add a leading slash. Use `index.html`, not `/index.html`.

6.  Save the change and wait for the distribution to finish deploying.

Without this setting, opening the domain root can result in an S3
`AccessDenied` response even when the bucket policy is correct.

## 9. Configure React Router fallback

Our website uses React Router. This means paths such as `/journey`,
`/dotnet`, and `/kestrel` are handled by the React application in the
browser. They are not separate HTML files in S3.

When a visitor refreshes `/journey`, the browser sends a request for
`/journey` to CloudFront. S3 does not have an object named `journey`, so
a private S3 origin can return `403 AccessDenied`.

We configure CloudFront to return the React entry page for that missing
route:

1.  Open the CloudFront distribution.

2.  Open **Error pages** (the label may appear as custom error responses
    in some console views).

3.  Click **Create custom error response**.

4.  Configure:

      Setting                     Value
      --------------------------- ------------------
      HTTP error code             `403: Forbidden`
      Customize error response    Yes
      Response page path          `/index.html`
      HTTP response code          `200: OK`
      Error caching minimum TTL   `0`

5.  Create the response and wait for CloudFront to finish deploying.

### Why use 403?

With a private S3 REST origin, a request for a nonexistent object can
return `403` rather than `404`, because the caller is not allowed to
list the bucket and S3 does not reveal whether the object exists.

### A caution about this fallback

This configuration can also turn a genuine 403 into the homepage
response. It is a practical fallback for this simple SPA, but it can
hide real permission problems. If you later add APIs, protected
resources, or more complex routing, consider a more selective routing
strategy.

## 10. Test the website

Open the CloudFront domain in a browser.

Then test the homepage and the React Router pages directly:

``` text
/
 /journey
 /csharp
 /program-cs
 /dotnet
 /dotnet-core
 /aspnet-core
 /kestrel
```

For each route:

1.  Open the URL directly.
2.  Refresh the browser.
3.  Check that the page and its CSS load correctly.

A successful homepage alone is not enough. Direct navigation and
refreshes test whether the SPA fallback is working.

## 11. Troubleshooting the errors we encountered

### A. Homepage returns `AccessDenied`

Check:

-   Is `index.html` directly in the bucket root?
-   Is CloudFront's **Default root object** set to `index.html`?
-   Is the S3 bucket policy granting the correct CloudFront distribution
    access?

Do not make the bucket public as a workaround.

### B. JavaScript or CSS returns `403`

Check the exact URL requested by the browser.

For example, if the browser requests:

``` text
/assets/index-xxxxx.js
```

the S3 object must be at:

``` text
s3://YOUR-BUCKET/assets/index-xxxxx.js
```

It must not be at the bucket root or under `dist/assets/`.

Also check that:

-   The object exists.
-   Its file size is not zero.
-   The bucket policy covers the object.
-   The object is not encrypted with a KMS key that CloudFront cannot
    use.

For a simple static website, S3-managed encryption (SSE-S3) is usually
the straightforward choice.

### C. The old error still appears after fixing S3

CloudFront may have cached an earlier error response.

1.  Open the distribution.

2.  Go to **Invalidations**.

3.  Click **Create invalidation**.

4.  Enter:

    ``` text
    /*
    ```

5.  Create the invalidation.

6.  Wait until its status is **Completed**.

7.  Refresh the browser using `Ctrl + Shift + R`.

An invalidation clears cached responses; it does not repair incorrect S3
paths or permissions.

### D. React Router refresh returns `AccessDenied`

Check that the CloudFront custom error response is configured for:

-   Error code `403`
-   Response page `/index.html`
-   Response code `200`
-   Minimum error caching TTL `0`

Then wait for deployment and test a route such as `/journey` again.

## 12. Updating the website later

Whenever you change the React application:

1.  Make your code changes locally.

2.  Run:

    ``` bash
    npm run build
    ```

3.  Open the new local `dist` folder.

4.  Upload the **contents** of `dist` to the root of the same S3 bucket.

5.  Allow files with the same names to be replaced.

6.  Create a CloudFront invalidation for:

    ``` text
    /*
    ```

7.  Wait for invalidation to complete and test the website.

Vite may generate new hashed JavaScript and CSS filenames after a build.
Upload the complete new `dist` contents, including the new `assets`
folder contents, rather than only replacing `index.html`.

Later, this manual process can be automated with GitHub Actions.

## 13. Monitor AWS credits and understand shutdown

Hosting on AWS is not automatically free forever. Your account's plan,
credits, usage, and current AWS pricing determine what happens.

Regularly check:

-   **Billing and Cost Management → Free Tier / Credits**
-   **Billing and Cost Management → Bills**
-   Credit balance and expiry date
-   Any usage or plan notifications

Do not assume that a credit balance means every service or feature is
free. Review the pricing and plan restrictions shown in your own
account. Avoid upgrading to a paid plan unless you understand the
billing consequences.

### If you want to shut down hosting manually

To take the website offline and remove the resources:

1.  Disable the CloudFront distribution.
2.  Wait until the change has deployed.
3.  Delete the CloudFront distribution.
4.  Empty the S3 bucket.
5.  Delete the S3 bucket.

Deleting only the S3 bucket while leaving other resources behind is not
a complete cleanup. Check the AWS billing console for any remaining
resources or charges.

AWS Free plan account closure rules can change. Check the current Free
plan terms in your account rather than relying on a remembered expiry or
shutdown date.

------------------------------------------------------------------------

## Final checklist

Use this list when reviewing the deployment:

-   [ ] Vite production build completed successfully.
-   [ ] S3 bucket created in the region available to the account.
-   [ ] S3 Block Public Access remained enabled.
-   [ ] Contents of `dist` uploaded to the bucket root.
-   [ ] CloudFront distribution created with the S3 bucket as origin.
-   [ ] Private S3 access through CloudFront enabled.
-   [ ] Default root object set to `index.html`.
-   [ ] React Router 403 fallback configured.
-   [ ] CloudFront deployment completed.
-   [ ] Homepage loads over HTTPS.
-   [ ] Direct route navigation and refresh work.
-   [ ] AWS credits and billing are monitored.

**The key lesson:** S3 stores the built website, CloudFront serves it,
and React Router fallback makes client-side routes work when a visitor
opens or refreshes them directly.

*Always learning. Always questioning.*
