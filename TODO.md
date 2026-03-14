# OS Pages Title Replacement - ZyniqAI + [Industry] OS

## Progress
- [x] Step 0: Analyzed files and confirmed plan with user
- [x] Step 1: Edit src/pages/HospitalityOS.tsx
- [x] Step 2: Edit src/pages/EducationOS.tsx (already static)
- [x] Step 3: Edit src/pages/LogisticsOS.tsx
- [x] Step 4: Edit src/pages/HealthcareOS.tsx
- [x] Step 5: Update TODO.md complete and test

## Plan Summary
Replace `<ScrollTextReveal text="ZyniqAI [Industry] OS" ... />` with:
```tsx
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  ZyniqAI + <span className="gradient-text" style={{
    background: "linear-gradient(90deg, hsl(40,72%,63%), hsl(0,72%,63%), hsl(280,83%,68%))",
    backgroundClip: "text",
    WebkitBackgroundClip: "text !important",
    WebkitTextFillColor: "transparent !important",
  }}>[Industry] OS</span>
</h2>
```

