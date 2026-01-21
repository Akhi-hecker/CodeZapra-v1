# Code Unlock Flow

## What is the Code Unlock Flow?

The **Code Unlock Flow** is the mechanism that **locks the code editor until the user explains their logic**. This enforces the logic-first methodology by preventing users from writing code before understanding the approach.

---

## Why Unlock Code?

| Without Code Unlock | With Code Unlock |
|---------------------|------------------|
| User copies code from elsewhere | User thinks through solution |
| Direct jump to coding | Logical approach required |
| Trial-and-error debugging | Reduced errors from planning |
| Surface-level learning | Deep conceptual understanding |

---

## The 6-Step Learning Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   TOPIC LEARNING FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐  │
│  │  1  │──▶│  2  │──▶│  3  │──▶│  4  │──▶│  5  │──▶│  6  │  │
│  └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘  │
│  Visual    Video     Logic     Code      Code      Done      │
│  Explain   + Notes   Explain   Editor    Eval               │
│                         │                                    │
│                         │                                    │
│            ┌────────────┴────────────┐                       │
│            │    GATE: Logic Check    │                       │
│            │    Must pass to unlock  │                       │
│            └─────────────────────────┘                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## State Management

**File:** `src/pages/TopicLearningPage.tsx`

```tsx
// Step tracking
const [currentStep, setCurrentStep] = useState(1);

// Logic gate states
const [logicText, setLogicText] = useState('');
const [isLogicApproved, setIsLogicApproved] = useState(false);

// Code states
const [isCodeUnlocked, setIsCodeUnlocked] = useState(false);
const [code, setCode] = useState('');
const [isCodeEvaluated, setIsCodeEvaluated] = useState(false);

// Completion state
const [isTopicComplete, setIsTopicComplete] = useState(false);
```

---

## Step-by-Step Breakdown

### Step 1: Visual Explanation

- User reads animated visual breakdown
- Click "Continue" to proceed

```tsx
{currentStep === 1 && (
  <VisualExplanation topic={topic} />
  <Button onClick={() => setCurrentStep(2)}>Continue</Button>
)}
```

---

### Step 2: Video & Notes

- User watches embedded video
- Option to download PDF notes
- Click "Continue" to proceed

```tsx
{currentStep === 2 && (
  <VideoPlayer src={topic.videoUrl} />
  <DownloadButton href={topic.notesUrl}>Download Notes</DownloadButton>
  <Button onClick={() => setCurrentStep(3)}>Continue</Button>
)}
```

---

### Step 3: Logic Explanation (THE GATE)

- User must explain their approach in plain English
- System validates for required keywords
- **This is the gate that unlocks the code editor**

```tsx
{currentStep === 3 && (
  <LogicExplanationStep
    logicText={logicText}
    setLogicText={setLogicText}
    onValidate={handleLogicValidation}
    isApproved={isLogicApproved}
  />
)}
```

**Validation Logic:**

```tsx
const handleLogicValidation = () => {
  const keywords = ['first', 'then', 'next', 'because', 'step', 'create', 'return'];
  const lowerText = logicText.toLowerCase();
  const foundCount = keywords.filter(k => lowerText.includes(k)).length;

  if (foundCount >= 3 && logicText.length >= 50) {
    setIsLogicApproved(true);
    setIsCodeUnlocked(true);  // 🔓 UNLOCK CODE EDITOR
    setCurrentStep(4);
  } else {
    showError('Please explain your approach using logic keywords.');
  }
};
```

---

### Step 4: Code Editor (UNLOCKED)

- Monaco Editor is now accessible
- User writes code based on their explained logic
- Run code to evaluate

```tsx
{currentStep === 4 && (
  <>
    {isCodeUnlocked ? (
      <MonacoEditor
        language="python"
        value={code}
        onChange={setCode}
        theme="vs-dark"
      />
      <Button onClick={handleRunCode}>Run Code</Button>
    ) : (
      <LockedEditor message="Complete Step 3 to unlock" />
    )}
  </>
)}
```

---

### Step 5: Code Evaluation

- Run code against predefined test cases
- Show pass/fail for each test
- Green checkmarks for passed tests

```tsx
const handleRunCode = async () => {
  const results = await evaluateCode(code, topic.testCases);

  if (results.allPassed) {
    setIsCodeEvaluated(true);
    setCurrentStep(6);
  } else {
    showError(`Failed test: ${results.failedTest.name}`);
  }
};
```

---

### Step 6: Complete & Progress

- Show success message
- Mark topic as complete in Firestore
- Navigate to next topic

```tsx
{currentStep === 6 && (
  <SuccessMessage>
    🎉 Topic Completed!
  </SuccessMessage>
  <Button onClick={handleNextTopic}>
    Continue to Next Topic →
  </Button>
)}
```

```tsx
const handleNextTopic = async () => {
  await markTopicComplete('python', currentSection, topicId);
  navigate(`/courses/python/topic/${nextTopicId}`);
};
```

---

## Visual State Diagram

```
┌───────────────┐
│   STEP 1      │
│   Visual      │
└───────┬───────┘
        │ Continue
        ▼
┌───────────────┐
│   STEP 2      │
│   Video       │
└───────┬───────┘
        │ Continue
        ▼
┌───────────────┐     ┌─────────────────────┐
│   STEP 3      │     │  Logic Validation   │
│   Logic       │────▶│  >= 3 keywords?     │
│   Explain     │     │  >= 50 chars?       │
└───────────────┘     └──────────┬──────────┘
                                 │
                    ┌────────────┼────────────┐
                    │ NO         │            │ YES
                    ▼            │            ▼
            ┌───────────────┐    │    ┌───────────────┐
            │   Show Error  │    │    │   🔓 UNLOCK   │
            │   + Hints     │────┘    │   isCodeUnlocked = true
            └───────────────┘         └───────┬───────┘
                                              │
                                              ▼
                                      ┌───────────────┐
                                      │   STEP 4      │
                                      │   Code Editor │
                                      └───────┬───────┘
                                              │ Run Code
                                              ▼
                                      ┌───────────────┐
                                      │   STEP 5      │
                                      │   Evaluate    │
                                      └───────┬───────┘
                                              │ All Tests Pass
                                              ▼
                                      ┌───────────────┐
                                      │   STEP 6      │
                                      │   Complete    │
                                      └───────────────┘
```

---

## UI Components

### Locked Editor Display

```tsx
const LockedEditor = ({ message }) => (
  <Box
    bg="gray.800"
    borderRadius="md"
    p={8}
    textAlign="center"
    opacity={0.7}
  >
    <Icon as={LockIcon} boxSize={12} color="gray.500" />
    <Text color="gray.400" mt={4}>{message}</Text>
  </Box>
);
```

### Step Indicator

```tsx
const StepIndicator = ({ current, total }) => (
  <HStack spacing={2}>
    {[1, 2, 3, 4, 5, 6].map(step => (
      <Circle
        key={step}
        size={8}
        bg={step <= current ? 'blue.500' : 'gray.300'}
        color={step <= current ? 'white' : 'gray.600'}
      >
        {step < current ? '✓' : step}
      </Circle>
    ))}
  </HStack>
);
```

---

## Files Involved

| File | Role |
|------|------|
| `TopicLearningPage.tsx` | Complete flow implementation |
| `ProgressContext.tsx` | Mark topic complete |
| `LogicFirstDemo.tsx` | Home page preview |

---

## Related Documentation

- [Logic-First Approach](./logic-first-approach.md)
- [Progress Tracking](./progress-tracking.md)
- [Pages Documentation](../frontend/pages.md)
