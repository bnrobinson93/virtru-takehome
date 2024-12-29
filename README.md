# Virtru Take-home Challenge for FrontendeEngineers

## Assignment

Welcome to the Virtru Take-home Challenge for Frontend Engineers! We're excited to see what you can do.

<details>
<summary>View More</summary>

### Foreword

We know that interviewing is challenging, stressful, and time-consuming. While take-homes are not perfect,
we believe they can offer us a better understanding of your skills and how you approach problems, but
we also hope that you find this challenge more fun and less stressful than a typical whiteboard / leetcode
interview.

### Considerations

Since this is a take-home challenge we want to make sure you take these considerations into account:

- Spend no more that 5 - 10 hours on this challenge. If you feel like you can finish in less time,
  that's great! You will not be penalized or rewarded for finishing early or late.
- Please use React and TypeScript to build the application. We are looking for a modern frontend
  application that is easy to maintain and extend.
- Please avoid excessive use of third-party libraries. If you need to use a library, please justify
  your choice in the documentation.
- Please write documentation on your design decisions, trade-offs, and any assumptions you made.
- Please read the Evaluation Criteria section below to understand how we will evaluate your submission.

### Evaluation Criteria

To make sure you are set up for success, we want to be transparent about how we will evaluate your
submission. What we are NOT looking for is a perfect solution. Please focus on the criteria and avoid
over-engineering, optimization, or feature creep.

What we are looking for:

- [ ] **Clarity**: Can we understand your code? Is it easy to read and maintain?
  - We are looking to see how clear it is to read and understand your code.
  - We are considering consistency in code style, clear separation of concerns, and a logical structure.
- [ ] **Communication**: Are you managing our expectations? Does it work as expected?
  - We are looking to see if your work is well-communicated, setting expectations, and meeting them.
  - We are looking for a few comments in the code to explain complicated parts, if any.
- [ ] **Completeness**: Does the code fulfill the requirements? Are there assurances that it works?
  - We are looking to see if you have completed the requirements of the challenge.
  - Do you have a few tests to assure it functions as expected and constraint trade-offs.
- [ ] **Safety**: Have you considered security vulnerabilities? Are you handling errors?
  - We are looking to see if you have considered security implications.
    - Are you following OWASP [basic security considerations](https://owasp.org/www-project-developer-guide/draft/design/web_app_checklist/)?
- [ ] **Creativity**: Does it solve the problem? Why would customers love your solution?
  - We are looking to see how you thought about the problem with empathy for users.
  - We are looking for creative solutions with a focus on balancing customer experience, time, and
    functionality.

### Problem Statement

We want to make sure this take-home helps you to understand the kind of problems we are solving at Virtru.
We run a platform with many services and each service has its own health status. This is a common and
simplistic form of monitoring that helps customers understand the health of their systems.

There are many examples of health checks in the wild, but we are going to focus on a simple one. We
have an API that returns the health of the system and its services. The API is a simple REST API that
returns the health of the system and its services. Some of the services are always healthy, some are
always unhealthy, and some are flakey.

#### Goal

Your task is to build a simple frontend application that shows the health of the system and its various
services. The application should use the provided API to fetch the services and their health status.

Users should be able to see the overall health of a system and the health of individual services. However,
since there are many services, a user might only care about a few services. Depending on the user
persona, they might want to only see the health of a few services to avoid alert fatigue or other cognitive
overload.

Often times when a service is unhealthy, we want to share the information with the user. We should
consider permanence of sharing this information especially when a service is flakey or unhealthy. Maybe
it was down for Bob when he shared, but it's up for Alice when she views it. How do we handle this?

Finally, we are open to creative solutions, but sometimes our solutions are inspired by the real world.
You are welcome to use real-world examples to inspire your solution, but please make sure to document
your inspiration and how it applies to the problem.

#### Requirements

- [x] Write a one page README explaining your design decisions, trade-offs, and any assumptions as well
      as any instructions on how to run your application.
- [x] Use React and TypeScript to build the application.
- [x] Show the overall health of the systems and the health of individual services
- [x] Allow users to view the health of individual services
- [x] Allow users to select which services they want to see
- [x] Service health should be updated every 5 seconds to simulate real-time updates
- [x] Alert the user when the service status changes
- [x] Allow users to manually share links with the status of the service in a point-in-time
      When loading page with shared link we should see the difference in status from point-in-time

_Note:_ There is no database so we are not expecting the service status to be saved between sessions
or when sharing links.

#### Development

- This take-home assessment focuses on the frontend, so there should only be a need to change files in [the web directory](./web/).
- To run the [server](./server/), there are two options:
  - Utilize [docker](https://docs.docker.com/) and the provided [Dockerfile](./Dockerfile) to build and run the container.
    - In the repo root: `docker build -t virtru-frontend-takehome-server . && docker run -p 8080:8080 virtru-frontend-takehome-server`
  - _Optionally_, you can use [Go](https://pkg.go.dev/std) to build and run the server on your machine, but please don't waste time on this unless you are comfortable with Go.

</details>

## Submission

### Thought Process

Upon reading the assignment, my first thoughts are to check the backend to see that:

1. I can hit it and
2. See which details the backend provides.

I accomplished this with just a simple curl command.

```sh
go run ./...
curl http://localhost:8080/health | jq
```

That alone gave me insight into how the response is structured and what will be available to display.
Namely, the application components to check and how they are organized.

With the what I'm working on sorted out, I start thinking through the problem statement.

### Design Details and Descisions

Note that links to each library can be found in the [Resources](#resources) section at the bottom of this document.

- This will be a single page application as there is no need for the complexity of a router. While I do plan to use query strings, additional routes are not necessary. See the (Future Enhancements)[#future-enhancements] section for how I might build this out further should the scope change.
  - The general structure will be that of MVC:
    - Each page (just one for this project) will have a directory under `src/`
    - Within that directory, the primary component will be named index.tsx and will handle only visual logic and structure
    - Other components used within the page will be split into two categories: general use and page-specific
    - Page specific compoenetns will be placed in the same sub-directory of the `src/` folder as the page itself
    - General purpose components will be placed in the `src/components` directory
  - Since each component will need access to the fetch results, context will be leveraged
- The page will be written Typescript and React, specifically Vite. While React/Typescript was dictated in the assignment, it would also by my preference as a modern front-end framework
- Tailwind will be used a for styling. It is a lightweight framework that is vastly used within the industry. As it is highly compressible and scales well, I feel that it is a solid option for building your own design language. Additionally, the Prettier plugin enables a consistent ordering of classes, which is helpful for code review. While CSS is an essential part of front end development, Tailwind - and it's CSS-like utility classes - allows for improved network performance while still demonstrating my ability and understanding of how styling works. Additionally, their color pallet is well thought through and provides good contrast and color-blind friendly options. The library would be installed and only provides styling, there is no security concern with the library. #TODO
  - By extension, Prettier will be used as a dev-dependency to ensure consistency in styling. This is an industry standard and is generally used in almost every company to ensure visual consistency between developers.
- Shadcn will be leveraged for the beginnings of a component library. This allows full control over the implementation details, ensures accessibility through Radix, and saves time on boilerplate components. At Virtru, I imagine that a design system is already in place and that it would be leveraged; as such, creating my own does not provide much value. Instead, I should focus on the the larger functionality of the application.
  - General purpose items will be placed in the `src/components` directory, not only for shadcn items but also hand-made components. Any item that is pulled by Shadcn will be designated as such via a comment in that component
- Lucide React icons will be used for iconography. By similar logic to Shadcn, this industry standard is used in place of a design system and acts as a building block. It allows single-item imports via tree-shaking and is ultimiately just a SVG image; therefore, it is very performant and provides a good developer and user experience.
- Vitest and React Testing Library will be used for testing. Vitest is a modern testing library that replaces Jest and provides Typescript support out of the box. This is a testing dependency so is not exposed to users. GitHub actions would be a solid testing solution as well; however, I feel that it is out of scope for this project. The aim is to show my ability to code a front-end application. Additionally, most CI/CD work is set up early in the process of development so I do not anticiate needing to do much CI/CD work for Virtru. As such, I see little value in setting it up for this project.
  - All test will be placed in the `__tests__/` directory, the structure of which will mirror the `src/` directory for ease of navigation and review.
- A custom `useFetch` hook will be created for the fetch that covers the following:
  - The custom hook will be placed in the `src/hooks` directory
  - Fetch from a given URL
  - Leverage AbortControllers to invalidate as necessary
  - An AbortController will be used to ensure no memory leaks and proper cleanup
  - Handle loading and error states
  - Loading and error states will be displayed to the user
  - While libraries like SWR, Axios or React Query are great, I felt that the `useFetch` hook was a good fit for this project. The needs are fairly minimal, caching is out of scope, and generally not needed for the nature of the application, and it better shows my ability to implement a well designed custom hook.
- A last updated timestamp will be displayed at the bottom of the page
  - Note that all services come from one request so the timestamp will be global as opposed to per-service
- A `useEffect`, in combination with the fetch hook will handle the 5-second re-fetching
  - A "Pause" button will be added to halt the timer and allow for manual debugging/refreshing
  - Note that the page will be paused if a share link is detected
- Two service status objects will maintained in state: previous and current. This is so that differences can be highlighted to users visually
  - If no previous state is found, the highlighting will not occur as that is a poor user experience on first page load
  - Memoization will be used to avoid unnecessary re-renders
- The page will display the overall status and a minimized list of services
- Filtering
  - There will be a global "Show/hide All" button - default will be to only show the overall status so as not to overwhelm users.
  - The selected show/hide state will be stored in local storage so that a user's preference is retained between page refreshes (no DB or that would be an option, too)
  - When expanded, a "Hide" button will be shown next to each entry to quickly hide a single entry
  - Additionally, there will be checkboxes next to each entry to allow user to mass-hide/show the entries
  - Any hidden entries will be moved to a collapse section at the bottom of the page for restoration. There will be a "Restore all" button inside the collapse for ease of use.
  - A "Filter by status" drop-down will be available. Statuses will be itemized but grayed out if not present in the response. This will be a list of check boxes
  - A text filter will be at the top for manual filtering
- Sharing
  - The primary modes of sharing that could be used here are via file or via a link. From a user perspective, a link is far more sharable, so that will be used.
  - #TODO can I use the global URL bar?
  - Each entry will also have a "Share" button next it to allow the user to share a link with the status of the service at a point-in-time
  - Share links will store the status by query string. The string will contain the time stamp and the status of the individual service as well as overall status
  - If multiple checkboxes are checked, the query string will contain the details for each of the services that are checked on
  - If a query string is detected, the page will default to the expand only the options listed in the query string, ignoring the receiving user's previous preference
  - Any difference between the status of the service at the time of the query string and the current status will be highlighted in some way

### Security Considerations

At first pass, there should be minimal security concerns. Considering the OWASP checklist:

- [x] **Define Security Requirements**
  - Since the only state being stored is to track a users's preference for displaying information, I would not consider this a security requirement
  - The query string for sharing will need to be sanitized of malicious content before rendering.
  - CORS will be used to allow the server to be accessed from the front end. Generally, this is handled from the server side, but this is not something to consider.
- [x] **Leverage Security Frameworks and Libraries**
  - My initial thought would be to leverage React 19's actions for securly running the fetch calls on the server; however, in review of the package.json, it seems we're not on a version that would support this. Additionally, running this on a server is likely overkill as the state does not contain any sensitive information.
  - The primary library I am considering using is Tailwind just for the ease and consistency of styling. Fetch, date, and query string are more than sufficient for this application and are native. If i were to build this out, I would consider using TanStack Query, which would offer a more robust fetching solution but this could be excessive for this project.
  - Additionally, Shadcd will be used as a component library. As the code is created in the project, this acts effectively as a non-dependency and is rather a semi-opinionated springboard for development of common components. As such, I would not consider this a security risk.
  - Lucide React Icons is well understood to be safe and is updated consistenty by the community. At time of writing, the last update was 15 hours ago, meaning the package is actively maintained and unlikely to contain security issues.
- [x] **Secure Database Access**
  - This is not applicable as the application has no database
  - RBAC would be interesting to consider, especially for hiding/showing statuses based on role, but I feel that such considerations fall outside of the scope of this challenge.
- [x] **Encode and Escape Data**
  - The primary escape/encode to consider for this application is the query string for sharing states.
- [x] **Validate All Inputs**
  - There is not much input provided, so there is little to consider here. Again, the query string will need sanitazation prior to rendering.
- [x] **Implement Digital Identity**
  - There is no database or user management, so this falls outside of the scope for this project.
- [x] **Enforce Access Controls**
  - There is no database or RBAC to consider here.
- [x] **Protect Data Everywhere**
  - There is no database to consider here. If there were, user sessions would need to be stored securely.
  - The query string could be encrypted or stored in a hashed way to prevent tampering but this feels out of scope. Note the [Future Enhancements](#future-enhancements) section for more thoughts.
- [x] **Implement Security Logging and Monitoring**
  - Logging will be added but this is mostly as an audit as there is no particular security concern around this page.
- [x] **Handle all Errors and Exceptions**
  - The primary item that could fail is the fetch call to the server. This will be handled gracefully without exposing information about the stack to the user.

#### Questions from Slack

| Question                     | Rationale                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Answer from Slack                                                                                                                                                                                                                                                                           |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Is Tailwind acceptable?**  | Tailwind is a CSS framework that provides utility classes. The primary drawback that most consider is that it clutters the DOM with classes where a single class could be used to accomplisht he same style. However, the advantage to Tailwind is that the CSS is highly compressible and provides consistency in two ways: 1) classes in the CSS are consistently placed preventing the "cascade" of CSS from becoming a negative and 2) the prettier plugin which sorts classes in the same order as the Tailwind CSS list, making it clear to a developer of the exact order that classes will be applied. This also helps in code review as the Prettier plugin makes highlighting new/removed classes more obvious. To resolve the clutter issue, I generally prefer to use a flavor of the MVC pattern where I use one component for the "view" (that is, HTML + classes) and one or more child components for the logic. | If you feel that tailwind is a good choice for you to create the kind of experience that a customer would love then that makes sense. If you do choose tailwind I would encourage you to follow their recommendations since we will be considering that.                                    |
| **Submission**               | Would you like my submission to be a zip of the code, GitHub link, or something else? If GitHub, would you like any actions set up or should testing be done locally? Should the submission include build steps and/or the compiled app, as well, or just the code itself?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | I'll let you decide how you want to demonstrate your work. A Readme is helpful for us to assess the alignment between the readme and our experience getting it running.                                                                                                                     |
| **Security - Query Strings** | 'm thinking that I will use query strings to share point-in-time links. RBAC seems out of scope but I did want to ask if yall have a preference on encrypting parameters? Since it would be a date/time and statuses at the most, I don't see anything super sensitive being leaked, however, I could see a potential risk there as the contents will be displayed, meaning there's a risk for script injection. Do you have any process or recommendations there?                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Access control is out of scope for this project. That said there are security concerns you should spend some time considering specifically with XSS. We will also consider developer experience so if the tooling doesn't exist to easily debug issues that might be considered a turn off. |

### Future Enhancements

- Routing for items like RBAC, multiple views, or metrics
- TanStack Query for caching and more robust features than `useFetch`
- Database and RBAC for storing and managing user preferences, metrics, and statuses over time
- Encryption or compression, or JWT, for query strings for enhanced security
- Keyboard shortcuts
- More robust edge case handling, namely large changes in the fetch response
- Leverage redux or a similar state management library in place of context
- Animations

### Resources

- OWASP [web app checklist](https://owasp.org/www-project-developer-guide/draft/design/web_app_checklist/)
- [Virtru](https://www.virtru.com/) for the favicon and inspiration around branding
- [v0](https://v0.dev) for inspiration: see the specific prompt and generated page here: [https://v0.dev/chat/0mB1qmJ0Syt](https://v0.dev/chat/0mB1qmJ0Syt)
- [Tailwind](https://tailwindcss.com/)
- [Color pallet generator for Tailwind](https://javisperez.github.io/tailwindcolorshades/?bunting=001E4A)
- [Vitest](https://vitest.dev/) documentation for testing
- [Shadcn](https://ui.shadcn.com/) for building-block components

# Usage

To run in development, ensure the backend is running and then run

```sh
npm run dev
```

To run in production, run

```sh
npm run build
npm run start
```
