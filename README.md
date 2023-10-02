# metaphor1
Metaphor Project

1. Fork and clone repository
2. Navigate to the project in your terminal
3. Activate virtual env "source venv/bin/activate"
4. Run "uvicorn main:app --host 0.0.0.0 --port 8000"
5. Open another terminal, and navigate to the project
6. Go to ghi folder "cd ghi"
7. Run "npm start"
8. Go to localhost:3000

The Metaphor job listings search allows users to edit the crawl dates to within 24 hours to get most recently posted job listings.
This allows users to go to one site to view all new postings from Linkedin, Indeed, ZipRecruiter, Monster, etc, and have access all
in one place.

If I had more time to work on the project, I would add button selections for the most popular job boards, and include the field 
for users to add additional URLs. When testing out the API, I noticed job listings from Indeed were 9 months old, but I would ideally 
create this search to populate job listings within the past 24 hours to up to one week old as a default value. 
