# Vercel-ზე Deploy-ის ინსტრუქციები

## 1. GitHub-ზე ატვირთვა

თუ ჯერ არ გაქვთ git ინიციალიზებული:

```bash
cd C:\Users\user\Desktop\gadawyveta
git init
git add .
git commit -m "Initial commit: დროის აღრიცხვის აპლიკაცია"
```

შექმენით ახალი repository GitHub-ზე და ატვირთეთ:

```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

## 2. Vercel-ზე Deploy

### ნაბიჯი 1: Vercel-ში შესვლა
1. გადადით https://vercel.com
2. შედით თქვენი GitHub ანგარიშით
3. დააჭირეთ "Add New" → "Project"

### ნაბიჯი 2: Repository-ს არჩევა
1. აირჩიეთ თქვენი "gadawyveta" repository
2. დააჭირეთ "Import"

### ნაბიჯი 3: Postgres ბაზის დამატება
**ეს ყველაზე მნიშვნელოვანი ნაბიჯია!**

1. Deploy-მდე, დააჭირეთ "Storage" tab-ს Vercel Dashboard-ზე
2. დააჭირეთ "Create Database"
3. აირჩიეთ "Postgres"
4. მიეცით სახელი (მაგ: "gadawyveta-db")
5. აირჩიეთ Region (ევროპისთვის: Frankfurt)
6. დააჭირეთ "Create"

### ნაბიჯი 4: ბაზის დაკავშირება პროექტთან
1. ბაზის შექმნის შემდეგ, დააჭირეთ "Connect Project"
2. აირჩიეთ თქვენი "gadawyveta" პროექტი
3. Vercel ავტომატურად დაამატებს ყველა საჭირო Environment Variable-ს:
   - POSTGRES_URL
   - POSTGRES_PRISMA_URL
   - POSTGRES_URL_NO_SSL
   - POSTGRES_URL_NON_POOLING
   - POSTGRES_USER
   - POSTGRES_HOST
   - POSTGRES_PASSWORD
   - POSTGRES_DATABASE

### ნაბიჯი 5: Deploy
1. დაბრუნდით "Overview" ან "Deployments" tab-ზე
2. დააჭირეთ "Deploy"
3. დაელოდეთ build-ს (1-2 წუთი)
4. Deploy-ის შემდეგ მიიღებთ URL-ს (მაგ: gadawyveta.vercel.app)

## 3. პირველი გაშვება

პირველი ვიზიტის დროს:
1. გახსენით თქვენი აპლიკაცია (gadawyveta.vercel.app)
2. ბაზის ცხრილი (`tasks`) **ავტომატურად შეიქმნება** პირველი API მოთხოვნის დროს
3. დაამატეთ პირველი დავალება

## 4. შემდგომი განახლებები

ყოველი ცვლილების შემდეგ:

```bash
git add .
git commit -m "აღწერა ცვლილებების"
git push
```

Vercel **ავტომატურად** დაასმუშავებს და გაშვებს განახლებულ ვერსიას!

## პრობლემების გადაჭრა

### პრობლემა: "Failed to fetch tasks"
**გადაწყვეტა**:
1. გადახედეთ Vercel Dashboard → Settings → Environment Variables
2. დარწმუნდით რომ ყველა POSTGRES_* ცვლადი არსებობს
3. თუ არა, დაუკავშირეთ ბაზა ხელახლა

### პრობლემა: "Table does not exist"
**გადაწყვეტა**:
- არაფერი. ცხრილი ავტომატურად შეიქმნება პირველი გამოყენების დროს
- თუ პრობლემა რჩება, შეამოწმეთ Vercel Logs → Functions → /api/tasks

### პრობლემა: Build ვერ მთავრდება
**გადაწყვეტა**:
1. შეამოწმეთ Vercel Build Logs
2. ადგილობრივად გაუშვით `npm run build` და შეამოწმეთ შეცდომები

## დამატებითი რესურსები

- [Vercel დოკუმენტაცია](https://vercel.com/docs)
- [Vercel Postgres დოკუმენტაცია](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js Deploy დოკუმენტაცია](https://nextjs.org/docs/deployment)

---

**გილოცავთ!** თქვენი აპლიკაცია ახლა live-ზე!
