import requests
from bs4 import BeautifulSoup
from subprocess import Popen, PIPE

# Step 1: Scrape README content from GitHub
def scrape_github_readme(repo_url):
    url = repo_url.rstrip('/') + '/blob/main/README.md'
    response = requests.get(url)
    if response.status_code != 200:
        print("Failed to retrieve the README content.")
        return None
    
    soup = BeautifulSoup(response.text, 'html.parser')
    readme_div = soup.find('article')
    if not readme_div:
        print("README content not found.")
        return None

    readme_text = ''.join([p.get_text() for p in readme_div.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'code'])])
    return readme_text

# Step 2: Use LLaMA to analyze README and extract skills
def analyze_with_llama(readme_text):
    process = Popen(["ollama", "run", "llama3.1"], stdin=PIPE, stdout=PIPE, stderr=PIPE, text=True)
    prompt = (
        f"Based on this README content, list the primary technical skills required to contribute to this project:\n"
        f"{readme_text}"
    )
       
    llama_output, _ = process.communicate(input=prompt)
    
    # Extract only the relevant skills from LLaMA’s output
    start_index = llama_output.find("primary technical skills") + len("primary technical skills")
    skills = llama_output[start_index:].strip()
    
    return skills

# Step 3: Match extracted skills to student profiles and assign tasks
def match_skills_with_profiles(extracted_skills, student_profiles):
    task_assignments = {}
    extracted_skills_list = extracted_skills.split('\n')
    
    for student, skills in student_profiles.items():
        matched_skills = [skill for skill in extracted_skills_list if any(keyword.lower() in skill.lower() for keyword in skills)]
        
        if matched_skills:
            task_assignments[student] = {
                "matched_skills": matched_skills,
                "tasks_assigned": [f"Contribute to {skill}" for skill in matched_skills]
            }
    
    return task_assignments

# Sample execution
if __name__ == "__main__":
    repo_url = input("Enter the GitHub repository URL: ")
    readme_text = scrape_github_readme(repo_url)
    
    if readme_text:
        print("\nExtracted README content:\n", readme_text)
        
        # Step 4: Analyze README with LLaMA and extract skills
        extracted_skills = analyze_with_llama(readme_text)
        print("\nLLaMA-Extracted Skills:\n", extracted_skills)
        
        # Step 5: Define sample student profiles with their skills
        student_profiles = {
            "Alice": ["python", "flask", "api", "watchdog"],
            "Bob": ["web development", "git", "flask"],
            "Charlie": ["linux", "python", "security", "watchdog", "yara"],
        }
        
        # Step 6: Match skills with student profiles and assign tasks
        task_assignments = match_skills_with_profiles(extracted_skills, student_profiles)
        
        # Display the task assignments
        print("\nTask Assignments:")
        for student, details in task_assignments.items():
            print(f"\nStudent: {student}")
            print("Matched Skills:", details["matched_skills"])
            print("Tasks Assigned:", details["tasks_assigned"])
