# PRD Templates Reference

Select the appropriate template based on the scope and nature of the product or feature.

## Full PRD Template

Use for: New products, large features, initiatives with cross-functional impact, or anything requiring executive approval.

```
1. Executive Summary
   - 2-3 paragraph overview suitable for leadership
   - Problem, proposed solution, expected impact

2. Problem Statement
   - What problem are we solving?
   - Who is affected and how?
   - Evidence: user research, data, support tickets, market analysis
   - What happens if we don't solve this?

3. Goals and Success Metrics
   - Primary goal (one sentence)
   - Secondary goals
   - Success metrics table:
     | Metric | Current Baseline | Target | Measurement Method |

4. Target Users
   - Primary persona(s) with brief description
   - Secondary persona(s)
   - User segments NOT targeted (and why)

5. User Stories and Scenarios
   - Format: "As a [user type], I want to [action] so that [benefit]"
   - Include 3-5 primary user stories
   - Include 1-2 edge case scenarios

6. Requirements
   - Requirements table:
     | ID | Requirement | Priority (MoSCoW) | Acceptance Criteria | Notes |
   - Group by functional area or user journey
   - Must haves listed first, then Should, Could, Won't

7. Design and UX Considerations
   - Key interaction patterns
   - Accessibility requirements
   - References to design mocks or prototypes (if available)

8. Technical Considerations
   - Architecture implications
   - Dependencies on other systems or teams
   - Data model changes
   - Performance requirements
   - Security and privacy considerations

9. Scope and Constraints
   - What is explicitly in scope
   - What is explicitly out of scope
   - Known constraints (timeline, budget, technical debt)
   - Dependencies and blockers

10. Rollout Plan
    - Phasing strategy (if applicable)
    - Feature flags / gradual rollout
    - Beta or dogfooding plan

11. Open Questions
    - Unresolved decisions with owners and target resolution dates
    - Format: [OPEN QUESTION] Description — Owner — Target date

12. Appendix
    - Version history table: | Version | Date | Author | Changes |
    - Related documents and links
    - Glossary of terms (if needed)
```

## Lightweight PRD Template

Use for: Smaller features, iterations on existing products, well-understood problem spaces, or fast-moving teams that need less ceremony.

```
1. Overview
   - Feature name, one-paragraph summary
   - Problem being solved (2-3 sentences)
   - Goal and primary success metric

2. Context
   - Why now? What triggered this work?
   - Relevant user feedback or data

3. Requirements
   - Requirements table:
     | ID | Requirement | Priority | Acceptance Criteria |
   - Keep to 5-15 requirements

4. Design Notes
   - Key UX decisions or patterns
   - Link to mocks if available

5. Technical Notes
   - Implementation considerations
   - Dependencies

6. Out of Scope
   - What this feature explicitly does NOT include

7. Open Questions
   - Unresolved items

8. Metadata
   - Version history table
```

## API / Technical PRD Template

Use for: Developer-facing features, APIs, platform capabilities, infrastructure projects, or technical tooling.

```
1. Executive Summary
   - What capability are we building?
   - Who are the target developers (internal, external, both)?
   - Expected impact

2. Problem Statement
   - Current developer pain point or gap
   - Evidence from developer feedback, support tickets, or usage data

3. Goals and Success Metrics
   - Adoption targets
   - Performance targets
   - Developer experience targets
   - Success metrics table

4. API Design
   - Endpoints / interfaces table:
     | Endpoint | Method | Description | Auth Required |
   - Request/response schemas (describe in prose or pseudo-JSON)
   - Error codes and handling
   - Rate limiting and quotas
   - Versioning strategy

5. Data Model
   - Key entities and relationships (describe in prose)
   - Storage considerations
   - Data retention and deletion policies

6. Requirements
   - Functional requirements table with priorities
   - Non-functional requirements:
     - Performance (latency, throughput)
     - Reliability (uptime, error budgets)
     - Scalability (expected load, growth projections)
     - Security (authentication, authorization, encryption)

7. Migration and Compatibility
   - Breaking changes (if any)
   - Migration path for existing users
   - Backward compatibility commitments
   - Deprecation timeline (if replacing something)

8. Developer Experience
   - Documentation plan
   - SDK support
   - Code examples needed
   - Onboarding flow

9. Monitoring and Observability
   - Key metrics to track
   - Alerting thresholds
   - Dashboard requirements

10. Rollout Plan
    - Alpha / beta / GA timeline
    - Feature flag strategy
    - Rollback plan

11. Open Questions

12. Appendix
    - Version history
    - Related RFCs or design docs
    - Glossary
```

## Choosing a Template

| Signal | Recommended Template |
|--------|---------------------|
| New product or major initiative | Full PRD |
| Cross-functional coordination needed | Full PRD |
| Executive approval required | Full PRD |
| Small feature or iteration | Lightweight PRD |
| Team already aligned on problem/solution | Lightweight PRD |
| Tight timeline, need to move fast | Lightweight PRD |
| API or developer-facing capability | API/Technical PRD |
| Infrastructure or platform work | API/Technical PRD |
| Internal tooling | API/Technical PRD |

When in doubt, start with the Full PRD. It's easier to remove sections than to realize you're missing something after engineering has started.
