"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
    Building,
    Database,
    Globe,
    Zap,
    Search,
    Copy,
    Play,
    Download,
    Star,
    Users,
    Shield,
    Briefcase,
    GraduationCap,
    Heart,
    TrendingUp,
    Code,
    Webhook,
    Settings,
} from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

interface Example {
    id: string;
    title: string;
    category: "use-case" | "industry" | "integration" | "scaling";
    industry?:
        | "healthcare"
        | "finance"
        | "education"
        | "ecommerce"
        | "support"
        | "hr";
    tags: string[];
    difficulty: "beginner" | "intermediate" | "advanced" | "enterprise";
    description: string;
    overview: string;
    code: string;
    setupInstructions: string;
    dependencies: string[];
    features: string[];
    useCases: string[];
    deploymentNotes?: string;
    scalingConsiderations?: string[];
    securityNotes?: string[];
    performanceMetrics?: {
        responseTime: string;
        throughput: string;
        costEstimate: string;
    };
}

const examples: Example[] = [
    {
        id: "customer-service-bot",
        title: "Production Customer Service Bot",
        category: "use-case",
        industry: "support",
        tags: ["customer-service", "handoffs", "escalation", "production"],
        difficulty: "intermediate",
        description:
            "Complete customer service system with agent handoffs, escalation paths, and knowledge base integration",
        overview:
            "A production-ready customer service bot that handles common inquiries, escalates to specialists, and maintains conversation context across handoffs.",
        code: `from agents import Agent, function_tool
import sqlite3
import requests
from datetime import datetime
import logging

# Knowledge base integration
@function_tool
def search_knowledge_base(query: str) -> str:
    """Search internal knowledge base for relevant information."""
    try:
        # Connect to knowledge base (replace with your DB)
        conn = sqlite3.connect('knowledge_base.db')
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT title, content, category 
            FROM articles 
            WHERE content LIKE ? OR title LIKE ?
            ORDER BY relevance_score DESC 
            LIMIT 3
        """, (f"%{query}%", f"%{query}%"))
        
        results = cursor.fetchall()
        conn.close()
        
        if results:
            formatted_results = []
            for title, content, category in results:
                formatted_results.append(f"**{title}** ({category}): {content[:200]}...")
            return "\\n\\n".join(formatted_results)
        else:
            return "No relevant articles found. Please escalate to human agent."
            
    except Exception as e:
        logging.error(f"Knowledge base error: {e}")
        return "Unable to search knowledge base. Escalating to human agent."

@function_tool
def get_customer_info(customer_id: str) -> str:
    """Retrieve customer information and history."""
    try:
        # Replace with your customer database
        response = requests.get(f"https://api.company.com/customers/{customer_id}")
        if response.status_code == 200:
            customer = response.json()
            return f"""Customer: {customer['name']}
Tier: {customer['tier']}
Account Status: {customer['status']}
Last Contact: {customer['last_contact']}
Open Issues: {customer['open_issues']}"""
        else:
            return "Customer not found. Please verify customer ID."
    except Exception as e:
        return "Unable to retrieve customer information."

# Specialized agents
billing_agent = Agent(
    name="Billing Specialist",
    instructions="""You are a billing specialist for customer service.

    Expertise:
    - Payment processing and billing inquiries
    - Subscription management and changes
    - Refund and credit processing
    - Invoice questions and disputes

    Process:
    1. Verify customer identity using customer_id
    2. Search knowledge base for billing policies
    3. For refunds >$100, create ticket for manager approval
    4. Always provide clear next steps

    Escalation triggers:
    - Refund requests over $100
    - Billing disputes over $500
    - Subscription cancellation requests
    - Payment processing errors""",
    tools=[get_customer_info, search_knowledge_base]
)

# Main customer service router
customer_service_agent = Agent(
    name="Customer Service Agent",
    instructions="""You are the main customer service agent for TechCorp.

    Your role:
    - Greet customers and understand their needs
    - Handle general questions about products and services
    - Route complex issues to appropriate specialists
    - Maintain friendly, professional tone throughout

    Routing guidelines:
    - Billing questions → Hand off to Billing Specialist
    - Technical issues → Hand off to Technical Support
    - General inquiries → Handle yourself using knowledge base

    Always:
    - Ask for customer ID early in conversation
    - Summarize the issue before handoffs
    - Provide estimated response times
    - Follow up on ticket creation""",
    
    handoffs=[billing_agent],
    tools=[get_customer_info, search_knowledge_base]
)`,
        setupInstructions: `1. Install dependencies: pip install agents requests sqlite3
2. Set up knowledge base database with articles table
3. Configure customer API endpoint in environment variables
4. Set up ticketing system integration
5. Deploy with proper logging and monitoring`,
        dependencies: ["agents", "requests", "sqlite3", "logging"],
        features: [
            "Multi-agent handoff system",
            "Knowledge base integration",
            "Customer data retrieval",
            "Automatic ticket creation",
            "Escalation path management",
            "Conversation context preservation",
        ],
        useCases: [
            "Enterprise customer support",
            "SaaS customer service",
            "E-commerce support",
            "Technical product support",
        ],
        deploymentNotes:
            "Deploy behind load balancer with Redis for session management",
        scalingConsiderations: [
            "Use Redis for session state",
            "Implement connection pooling for database",
            "Add rate limiting per customer",
            "Use async processing for ticket creation",
            "Cache knowledge base responses",
        ],
        securityNotes: [
            "Validate customer ID before data access",
            "Encrypt sensitive customer data",
            "Audit all agent interactions",
            "Rate limit API calls",
        ],
        performanceMetrics: {
            responseTime: "< 2 seconds",
            throughput: "100 concurrent conversations",
            costEstimate: "$0.10-0.30 per conversation",
        },
    },

    {
        id: "healthcare-assistant",
        title: "Healthcare Virtual Assistant",
        category: "industry",
        industry: "healthcare",
        tags: ["healthcare", "HIPAA", "patient-care", "appointments"],
        difficulty: "advanced",
        description:
            "HIPAA-compliant healthcare assistant for patient inquiries and appointment scheduling",
        overview:
            "A secure healthcare virtual assistant that handles patient inquiries, appointment scheduling, and provides general health information while maintaining strict HIPAA compliance.",
        code: `from agents import Agent, function_tool
import hashlib
import logging
from datetime import datetime, timedelta
import requests

# HIPAA-compliant logging
def secure_log(level: str, message: str, patient_id: str = None):
    """HIPAA-compliant logging with patient ID hashing."""
    if patient_id:
        hashed_id = hashlib.sha256(patient_id.encode()).hexdigest()[:8]
        message = f"[Patient: {hashed_id}] {message}"
    
    if level == "error":
        logging.error(message)
    elif level == "info":
        logging.info(message)
    elif level == "warning":
        logging.warning(message)

@function_tool
def check_appointment_availability(date: str, department: str) -> str:
    """Check available appointment slots for a given date and department."""
    try:
        # Validate date format
        appointment_date = datetime.strptime(date, "%Y-%m-%d")
        
        if appointment_date < datetime.now():
            return "Cannot schedule appointments in the past."
        
        # Check if date is too far in future (6 months max)
        if appointment_date > datetime.now() + timedelta(days=180):
            return "Appointments can only be scheduled up to 6 months in advance."
        
        # Mock API call to scheduling system
        available_slots = [
            "9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"
        ]
        
        secure_log("info", f"Checked availability for {department} on {date}")
        
        return f"Available appointments for {department} on {date}:\\n" + "\\n".join([
            f"- {slot}" for slot in available_slots
        ])
        
    except ValueError:
        return "Invalid date format. Please use YYYY-MM-DD format."
    except Exception as e:
        secure_log("error", f"Appointment check failed: {str(e)}")
        return "Unable to check appointment availability. Please call our office."

@function_tool
def get_general_health_info(topic: str) -> str:
    """Provide general health information (non-diagnostic)."""
    
    # Approved health topics only
    approved_topics = {
        "nutrition": "A balanced diet includes fruits, vegetables, whole grains, lean proteins, and healthy fats. Aim for 5-9 servings of fruits and vegetables daily.",
        "exercise": "Adults should aim for at least 150 minutes of moderate-intensity exercise per week, plus strength training twice weekly.",
        "sleep": "Most adults need 7-9 hours of quality sleep per night. Maintain a consistent sleep schedule and create a relaxing bedtime routine.",
        "preventive": "Regular check-ups, vaccinations, and screenings are important for maintaining health. Follow your doctor's recommendations.",
    }
    
    topic_lower = topic.lower()
    for key, info in approved_topics.items():
        if key in topic_lower:
            secure_log("info", f"Provided general health info on: {topic}")
            return f"{info}\\n\\nDISCLAIMER: This is general information only. Consult your healthcare provider for personalized medical advice."
    
    return "I can provide general information about nutrition, exercise, sleep, and preventive care. For specific medical questions, please consult your healthcare provider."

@function_tool
def patient_portal_help(issue: str) -> str:
    """Help patients with common portal issues."""
    
    help_topics = {
        "login": "For login issues: 1) Verify your username and password, 2) Try resetting your password, 3) Clear browser cache, 4) Contact support if issues persist.",
        "lab results": "Lab results are typically available 1-3 business days after testing. Check the 'Test Results' section of your portal.",
        "prescription": "Prescription refills can be requested through the 'Medications' section. Allow 24-48 hours for processing.",
        "billing": "View bills and payment history in the 'Billing' section. Set up automatic payments for convenience.",
    }
    
    issue_lower = issue.lower()
    for key, help_text in help_topics.items():
        if key in issue_lower:
            return help_text
    
    return "For technical portal issues, please contact our IT support at (555) 123-4567 or email support@healthcenter.com"

healthcare_assistant = Agent(
    name="Healthcare Virtual Assistant",
    instructions="""You are a HIPAA-compliant healthcare virtual assistant for MedCenter.

    CRITICAL COMPLIANCE REQUIREMENTS:
    - Never provide medical diagnoses or treatment advice
    - Always include appropriate medical disclaimers
    - Direct specific medical questions to healthcare providers
    - Maintain patient privacy and confidentiality
    - Log interactions securely without exposing PHI

    Your capabilities:
    - Appointment scheduling assistance
    - General health education (non-diagnostic)
    - Patient portal support
    - Insurance and billing information
    - Facility directions and hours

    For every health-related response:
    1. Provide only general, educational information
    2. Include medical disclaimers
    3. Encourage consulting healthcare providers
    4. Maintain professional, caring tone

    Standard disclaimer:
    "This information is for educational purposes only and does not constitute medical advice. Always consult your healthcare provider for personalized medical guidance."

    You can help with:
    - Scheduling and rescheduling appointments
    - General health and wellness information
    - Patient portal navigation
    - Insurance verification process
    - Prescription refill procedures

    You CANNOT:
    - Diagnose medical conditions
    - Recommend specific treatments
    - Access patient medical records
    - Provide medication dosage advice
    - Interpret test results""",
    
    tools=[check_appointment_availability, get_general_health_info, patient_portal_help]
)`,
        setupInstructions: `1. Install dependencies: pip install agents hashlib datetime requests
2. Configure HIPAA-compliant logging system
3. Set up encrypted database connections
4. Implement patient identity verification
5. Configure secure API endpoints
6. Set up audit trail logging
7. Deploy with end-to-end encryption`,
        dependencies: ["agents", "hashlib", "datetime", "requests", "logging"],
        features: [
            "HIPAA-compliant design",
            "Secure patient information handling",
            "Appointment scheduling integration",
            "General health education",
            "Patient portal support",
            "Audit trail logging",
        ],
        useCases: [
            "Hospital patient services",
            "Medical practice support",
            "Telehealth platforms",
            "Healthcare call centers",
        ],
        deploymentNotes:
            "Requires HIPAA-compliant infrastructure and BAA agreements",
        scalingConsiderations: [
            "Implement patient session encryption",
            "Use secure multi-tenant architecture",
            "Add healthcare provider authentication",
            "Integrate with EHR systems securely",
            "Monitor for compliance violations",
        ],
        securityNotes: [
            "End-to-end encryption required",
            "Regular HIPAA compliance audits",
            "Secure API key management",
            "Patient data anonymization",
            "Access control and logging",
        ],
        performanceMetrics: {
            responseTime: "< 3 seconds for queries",
            throughput: "200 patient interactions per hour",
            costEstimate: "$0.15-0.40 per interaction",
        },
    },

    {
        id: "database-integration",
        title: "Database Integration Agent",
        category: "integration",
        tags: ["database", "sql", "data-retrieval", "enterprise"],
        difficulty: "intermediate",
        description:
            "Production-ready agent with secure database connectivity and query optimization",
        overview:
            "A robust database integration example showing secure connections, query optimization, and error handling for enterprise applications.",
        code: `from agents import Agent, function_tool
import sqlite3
import psycopg2
from contextlib import contextmanager
import os
import logging
from typing import Optional

# Database connection management
@contextmanager
def get_db_connection(db_type: str = "postgres"):
    """Secure database connection with proper cleanup."""
    conn = None
    try:
        if db_type == "postgres":
            conn = psycopg2.connect(
                host=os.getenv("DB_HOST"),
                database=os.getenv("DB_NAME"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                port=os.getenv("DB_PORT", 5432)
            )
        elif db_type == "sqlite":
            conn = sqlite3.connect(os.getenv("SQLITE_PATH", "data.db"))
        
        yield conn
    except Exception as e:
        logging.error(f"Database connection error: {e}")
        if conn:
            conn.rollback()
        raise
    finally:
        if conn:
            conn.close()

@function_tool
def query_customer_data(customer_id: str, fields: str = "name,email,status") -> str:
    """Safely query customer data with field validation."""
    try:
        # Validate customer_id format
        if not customer_id.isalnum():
            return "Invalid customer ID format"
        
        # Validate requested fields
        allowed_fields = ['name', 'email', 'status', 'created_at', 'last_login']
        requested_fields = [f.strip() for f in fields.split(',')]
        valid_fields = [f for f in requested_fields if f in allowed_fields]
        
        if not valid_fields:
            return "No valid fields requested"
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Use parameterized query to prevent SQL injection
            field_list = ', '.join(valid_fields)
            query = f"SELECT {field_list} FROM customers WHERE customer_id = %s"
            
            cursor.execute(query, (customer_id,))
            result = cursor.fetchone()
            
            if result:
                return "Customer Data:\\n" + "\\n".join([
                    f"{field}: {value}" for field, value in zip(valid_fields, result)
                ])
            else:
                return f"Customer {customer_id} not found"
                
    except Exception as e:
        logging.error(f"Query error: {e}")
        return "Unable to retrieve customer data"

@function_tool
def get_order_history(customer_id: str, limit: int = 10) -> str:
    """Retrieve customer order history with pagination."""
    try:
        # Validate inputs
        if not customer_id.isalnum():
            return "Invalid customer ID"
        
        limit = min(max(1, limit), 50)  # Limit between 1-50
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            query = """
                SELECT order_id, order_date, total_amount, status
                FROM orders 
                WHERE customer_id = %s 
                ORDER BY order_date DESC 
                LIMIT %s
            """
            
            cursor.execute(query, (customer_id, limit))
            results = cursor.fetchall()
            
            if results:
                orders = []
                for order_id, date, amount, status in results:
                    orders.append("Order #" + str(order_id) + ": $" + str(amount) + " (" + status + ") - " + str(date))
                
                return "Recent Orders (" + str(len(results)) + "):\\n" + "\\n".join(orders)
            else:
                return "No order history found"
                
    except Exception as e:
        logging.error("Order query error: " + str(e))
        return "Unable to retrieve order history"

# Database agent with comprehensive tools
database_agent = Agent(
    name="Database Integration Agent",
    instructions="""You are a database integration agent for customer service and operations.

    Your capabilities:
    - Query customer information securely
    - Retrieve order history and transaction data
    - Handle data requests with appropriate validation

    Security protocols:
    - Always validate input parameters
    - Use parameterized queries only
    - Log all database operations
    - Respect data access permissions

    Data handling guidelines:
    - Limit query results to prevent overload
    - Validate field requests against allowed lists
    - Provide clear error messages without exposing internals
    - Maintain audit trails for all operations

    When querying data:
    1. Validate all input parameters
    2. Use minimal necessary permissions
    3. Log the request for audit purposes
    4. Return formatted, user-friendly results""",
    
    tools=[query_customer_data, get_order_history]
)`,
        setupInstructions: `1. Install dependencies: pip install agents psycopg2-binary
2. Set up environment variables for database connection
3. Configure connection pooling for production
4. Set up audit logging tables
5. Implement proper database user permissions
6. Configure SSL for database connections`,
        dependencies: ["agents", "psycopg2-binary", "contextlib", "logging"],
        features: [
            "Secure database connections",
            "SQL injection prevention",
            "Connection pooling support",
            "Audit trail logging",
            "Input validation",
            "Error handling and recovery",
        ],
        useCases: [
            "Customer service applications",
            "Data retrieval automation",
            "Business intelligence tools",
            "Administrative interfaces",
        ],
        deploymentNotes:
            "Use connection pooling and read replicas for production",
        scalingConsiderations: [
            "Implement connection pooling",
            "Use read replicas for queries",
            "Add query result caching",
            "Monitor database performance",
            "Implement circuit breakers",
        ],
        securityNotes: [
            "Use minimal database permissions",
            "Encrypt connections with SSL",
            "Audit all database operations",
            "Validate all input parameters",
            "Regular security reviews required",
        ],
        performanceMetrics: {
            responseTime: "< 1 second for simple queries",
            throughput: "200 queries per minute",
            costEstimate: "$0.01-0.05 per query",
        },
    },

    {
        id: "education-tutor",
        title: "AI Education Tutor",
        category: "industry",
        industry: "education",
        tags: [
            "education",
            "tutoring",
            "adaptive-learning",
            "student-progress",
        ],
        difficulty: "intermediate",
        description:
            "Adaptive AI tutor that personalizes learning experiences and tracks student progress",
        overview:
            "An intelligent tutoring system that adapts to individual learning styles, provides personalized instruction, and tracks student progress across multiple subjects.",
        code: `from agents import Agent, function_tool
import json
import math
from datetime import datetime
from typing import Dict, List

# Student progress tracking
class ProgressTracker:
    def __init__(self):
        self.student_progress = {}
    
    def update_progress(self, student_id: str, subject: str, topic: str, score: float):
        if student_id not in self.student_progress:
            self.student_progress[student_id] = {}
        
        if subject not in self.student_progress[student_id]:
            self.student_progress[student_id][subject] = {}
        
        self.student_progress[student_id][subject][topic] = {
            'score': score,
            'last_attempt': datetime.now().isoformat(),
            'attempts': self.student_progress[student_id][subject].get(topic, {}).get('attempts', 0) + 1
        }

progress_tracker = ProgressTracker()

@function_tool
def assess_student_level(student_id: str, subject: str) -> str:
    """Assess student's current level in a subject."""
    try:
        if student_id not in progress_tracker.student_progress:
            return f"No previous data for student {student_id}. Starting with beginner assessment."
        
        subject_data = progress_tracker.student_progress[student_id].get(subject, {})
        
        if not subject_data:
            return f"No data for {subject}. Starting with beginner level."
        
        # Calculate average score across all topics
        scores = [topic_data['score'] for topic_data in subject_data.values()]
        avg_score = sum(scores) / len(scores)
        
        if avg_score >= 90:
            level = "Advanced"
        elif avg_score >= 75:
            level = "Intermediate"
        elif avg_score >= 60:
            level = "Beginner-Intermediate"
        else:
            level = "Beginner"
        
        return f"Student {student_id} level in {subject}: {level} (Average score: {avg_score:.1f}%)"
        
    except Exception as e:
        return "Unable to assess student level. Starting with beginner content."

@function_tool
def generate_practice_problems(subject: str, topic: str, difficulty: str, count: int = 3) -> str:
    """Generate practice problems based on subject, topic, and difficulty."""
    
    problems = {
        "math": {
            "algebra": {
                "beginner": [
                    "Solve for x: 2x + 5 = 13",
                    "What is the value of x in: x - 7 = 12?",
                    "Simplify: 3x + 2x"
                ],
                "intermediate": [
                    "Solve the system: 2x + y = 7, x - y = 2",
                    "Factor: x² + 5x + 6",
                    "Solve: x² - 4x + 3 = 0"
                ],
                "advanced": [
                    "Solve: log₂(x) + log₂(x-3) = 2",
                    "Find the inverse of f(x) = 2x + 3",
                    "Solve the inequality: |2x - 1| < 5"
                ]
            }
        },
        "science": {
            "chemistry": {
                "beginner": [
                    "What is the chemical symbol for gold?",
                    "How many protons does carbon have?",
                    "What is the pH of pure water?"
                ],
                "intermediate": [
                    "Balance: C₃H₈ + O₂ → CO₂ + H₂O",
                    "Calculate moles in 36g of H₂O",
                    "What is the molarity of 2 moles NaCl in 500mL solution?"
                ]
            }
        }
    }
    
    try:
        subject_problems = problems.get(subject.lower(), {})
        topic_problems = subject_problems.get(topic.lower(), {})
        difficulty_problems = topic_problems.get(difficulty.lower(), [])
        
        if not difficulty_problems:
            return f"No problems available for {subject} - {topic} at {difficulty} level."
        
        selected_problems = difficulty_problems[:min(count, len(difficulty_problems))]
        
        result = f"Practice Problems - {subject.title()} ({topic.title()}) - {difficulty.title()} Level:\\n\\n"
        for i, problem in enumerate(selected_problems, 1):
            result += f"{i}. {problem}\\n"
        
        return result
        
    except Exception as e:
        return "Unable to generate practice problems. Please try again."

@function_tool
def record_student_answer(student_id: str, subject: str, topic: str, 
                         problem: str, answer: str, correct: bool) -> str:
    """Record student's answer and update progress."""
    try:
        # Calculate score based on correctness
        score = 100 if correct else 0
        
        # Update progress
        progress_tracker.update_progress(student_id, subject, topic, score)
        
        # Get current progress for this topic
        topic_data = progress_tracker.student_progress[student_id][subject][topic]
        attempts = topic_data['attempts']
        
        feedback = f"Answer recorded for {student_id}.\\n"
        feedback += f"Problem: {problem}\\n"
        feedback += f"Your answer: {answer}\\n"
        feedback += f"Result: {'Correct!' if correct else 'Incorrect'}\\n"
        feedback += f"Topic attempts: {attempts}\\n"
        
        # Provide adaptive feedback
        if correct:
            if attempts == 1:
                feedback += "Excellent! You got it right on the first try!"
            else:
                feedback += "Great job! You're showing improvement."
        else:
            feedback += "Don't worry! Learning takes practice. Let's try another approach."
        
        return feedback
        
    except Exception as e:
        return "Unable to record answer. Please try again."

@function_tool
def get_learning_recommendations(student_id: str, subject: str) -> str:
    """Provide personalized learning recommendations."""
    try:
        if student_id not in progress_tracker.student_progress:
            return "Complete some practice problems first to get personalized recommendations."
        
        subject_data = progress_tracker.student_progress[student_id].get(subject, {})
        
        if not subject_data:
            return f"No progress data for {subject}. Start with beginner topics."
        
        # Analyze performance by topic
        weak_topics = []
        strong_topics = []
        
        for topic, data in subject_data.items():
            if data['score'] < 70:
                weak_topics.append(topic)
            elif data['score'] >= 85:
                strong_topics.append(topic)
        
        recommendations = f"Learning Recommendations for {student_id} in {subject}:\\n\\n"
        
        if weak_topics:
            recommendations += "Focus Areas (need improvement):\\n"
            for topic in weak_topics:
                recommendations += f"- {topic.title()}: Review basics and practice more\\n"
        
        if strong_topics:
            recommendations += "\\nStrong Areas (ready for advancement):\\n"
            for topic in strong_topics:
                recommendations += f"- {topic.title()}: Try advanced problems\\n"
        
        recommendations += "\\nNext Steps:\\n"
        if weak_topics:
            recommendations += f"- Focus on {weak_topics[0]} with beginner problems\\n"
        recommendations += "- Practice 10-15 minutes daily\\n"
        recommendations += "- Review incorrect answers\\n"
        
        return recommendations
        
    except Exception as e:
        return "Unable to generate recommendations. Please try again."

# AI Education Tutor Agent
education_tutor = Agent(
    name="AI Education Tutor",
    instructions="""You are an AI education tutor specializing in personalized learning.

    Your role:
    - Assess student knowledge levels
    - Generate appropriate practice problems
    - Track student progress over time
    - Provide personalized learning recommendations
    - Adapt difficulty based on performance

    Teaching approach:
    - Start with assessment to understand current level
    - Provide problems slightly above current ability (zone of proximal development)
    - Give encouraging feedback regardless of correctness
    - Focus on learning process, not just correct answers
    - Adapt difficulty based on student performance

    For each interaction:
    1. Assess where the student is in their learning journey
    2. Provide appropriate level content
    3. Record progress and give feedback
    4. Suggest next steps for continued learning

    Subjects you can help with:
    - Mathematics (algebra, geometry, calculus)
    - Science (chemistry, physics, biology)
    - Reading comprehension
    - Writing skills

    Always:
    - Be encouraging and patient
    - Explain concepts clearly
    - Provide step-by-step guidance
    - Celebrate progress and learning
    - Adapt to individual learning styles""",
    
    tools=[assess_student_level, generate_practice_problems, record_student_answer, get_learning_recommendations]
)`,
        setupInstructions: `1. Install dependencies: pip install agents json datetime
2. Set up student database for progress tracking
3. Configure subject matter databases
4. Implement learning analytics dashboard
5. Set up parent/teacher progress reports
6. Deploy with student privacy protections`,
        dependencies: ["agents", "json", "datetime", "math"],
        features: [
            "Adaptive difficulty adjustment",
            "Personalized learning paths",
            "Progress tracking and analytics",
            "Multi-subject support",
            "Student performance assessment",
            "Learning recommendation engine",
        ],
        useCases: [
            "Online tutoring platforms",
            "Educational apps",
            "Homework assistance",
            "Skill assessment tools",
        ],
        deploymentNotes:
            "Ensure compliance with student privacy laws (FERPA, COPPA)",
        scalingConsiderations: [
            "Cache frequently accessed problems",
            "Implement real-time progress sync",
            "Use analytics for content optimization",
            "Add multi-language support",
            "Scale progress tracking database",
        ],
        securityNotes: [
            "Protect student personal information",
            "Encrypt progress data",
            "Implement parental controls",
            "Audit access to student records",
            "Follow educational privacy regulations",
        ],
        performanceMetrics: {
            responseTime: "< 2 seconds for problem generation",
            throughput: "500 students simultaneously",
            costEstimate: "$0.05-0.15 per student session",
        },
    },
];

const categories = [
    { id: "all", name: "All Examples", icon: Globe, color: "gray" },
    { id: "use-case", name: "Use Cases", icon: Briefcase, color: "blue" },
    {
        id: "industry",
        name: "Industry Specific",
        icon: Building,
        color: "green",
    },
    {
        id: "integration",
        name: "Integrations",
        icon: Database,
        color: "purple",
    },
    {
        id: "scaling",
        name: "Scaling Patterns",
        icon: TrendingUp,
        color: "orange",
    },
];

const industries = [
    { id: "all", name: "All Industries" },
    { id: "healthcare", name: "Healthcare", icon: Heart },
    { id: "finance", name: "Finance", icon: TrendingUp },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "support", name: "Customer Support", icon: Users },
    { id: "ecommerce", name: "E-commerce", icon: Briefcase },
];

const difficulties = [
    "all",
    "beginner",
    "intermediate",
    "advanced",
    "enterprise",
];

export function ExamplesCollection() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedIndustry, setSelectedIndustry] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedExample, setSelectedExample] = useState<Example | null>(
        null
    );

    const filteredExamples = examples.filter((example) => {
        const matchesCategory =
            selectedCategory === "all" || example.category === selectedCategory;
        const matchesIndustry =
            selectedIndustry === "all" || example.industry === selectedIndustry;
        const matchesDifficulty =
            selectedDifficulty === "all" ||
            example.difficulty === selectedDifficulty;
        const matchesSearch =
            searchQuery === "" ||
            example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            example.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            example.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            );

        return (
            matchesCategory &&
            matchesIndustry &&
            matchesDifficulty &&
            matchesSearch
        );
    });

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
    };

    const sendToPlayground = (code: string) => {
        localStorage.setItem("playground_import_code", code);
        window.open("/playground", "_blank");
    };

    const downloadExample = (example: Example) => {
        const content = `# ${example.title}

${example.description}

## Overview
${example.overview}

## Setup Instructions
${example.setupInstructions}

## Dependencies
${example.dependencies.map((dep) => `- ${dep}`).join("\\n")}

## Code

\`\`\`python
${example.code}
\`\`\`

## Features
${example.features.map((feature) => `- ${feature}`).join("\\n")}

## Use Cases
${example.useCases.map((useCase) => `- ${useCase}`).join("\\n")}

${
    example.deploymentNotes
        ? `## Deployment Notes
${example.deploymentNotes}`
        : ""
}

${
    example.scalingConsiderations
        ? `## Scaling Considerations
${example.scalingConsiderations
    .map((consideration) => `- ${consideration}`)
    .join("\\n")}`
        : ""
}

${
    example.securityNotes
        ? `## Security Notes
${example.securityNotes.map((note) => `- ${note}`).join("\\n")}`
        : ""
}

${
    example.performanceMetrics
        ? `## Performance Metrics
- Response Time: ${example.performanceMetrics.responseTime}
- Throughput: ${example.performanceMetrics.throughput}
- Cost Estimate: ${example.performanceMetrics.costEstimate}`
        : ""
}
`;

        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${example.id}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getCategoryIcon = (category: string) => {
        const cat = categories.find((c) => c.id === category);
        const Icon = cat?.icon || Globe;
        return Icon;
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "use-case":
                return "text-blue-600 bg-blue-100";
            case "industry":
                return "text-green-600 bg-green-100";
            case "integration":
                return "text-purple-600 bg-purple-100";
            case "scaling":
                return "text-orange-600 bg-orange-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "beginner":
                return "bg-green-100 text-green-800";
            case "intermediate":
                return "bg-yellow-100 text-yellow-800";
            case "advanced":
                return "bg-red-100 text-red-800";
            case "enterprise":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getIndustryIcon = (industry: string) => {
        const ind = industries.find((i) => i.id === industry);
        return ind?.icon || Building;
    };

    if (selectedExample) {
        const Icon = getCategoryIcon(selectedExample.category);
        const IndustryIcon = selectedExample.industry
            ? getIndustryIcon(selectedExample.industry)
            : Building;

        return (
            <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setSelectedExample(null)}
                    >
                        ← Back to Examples
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                copyToClipboard(selectedExample.code)
                            }
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Code
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => downloadExample(selectedExample)}
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                        </Button>
                        <Button
                            onClick={() =>
                                sendToPlayground(selectedExample.code)
                            }
                        >
                            <Play className="h-4 w-4 mr-2" />
                            Try in Playground
                        </Button>
                    </div>
                </div>

                {/* Example Details */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div
                                        className={`p-2 rounded-lg ${getCategoryColor(
                                            selectedExample.category
                                        )}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    {selectedExample.industry && (
                                        <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                                            <IndustryIcon className="h-5 w-5" />
                                        </div>
                                    )}
                                    <div>
                                        <h1 className="text-2xl font-bold">
                                            {selectedExample.title}
                                        </h1>
                                        <p className="text-muted-foreground">
                                            {selectedExample.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <Badge
                                        className={getDifficultyColor(
                                            selectedExample.difficulty
                                        )}
                                    >
                                        {selectedExample.difficulty}
                                    </Badge>
                                    {selectedExample.performanceMetrics && (
                                        <Badge variant="outline">
                                            <Zap className="h-3 w-3 mr-1" />
                                            {
                                                selectedExample
                                                    .performanceMetrics
                                                    .responseTime
                                            }
                                        </Badge>
                                    )}
                                    {selectedExample.tags.map((tag) => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList>
                                <TabsTrigger value="overview">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="code">Code</TabsTrigger>
                                <TabsTrigger value="setup">Setup</TabsTrigger>
                                <TabsTrigger value="deployment">
                                    Deployment
                                </TabsTrigger>
                                {selectedExample.performanceMetrics && (
                                    <TabsTrigger value="metrics">
                                        Metrics
                                    </TabsTrigger>
                                )}
                            </TabsList>

                            <TabsContent value="overview">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">
                                            Overview
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {selectedExample.overview}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">
                                                Features
                                            </h3>
                                            <ul className="space-y-2">
                                                {selectedExample.features.map(
                                                    (feature, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-start gap-2"
                                                        >
                                                            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm">
                                                                {feature}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">
                                                Use Cases
                                            </h3>
                                            <ul className="space-y-2">
                                                {selectedExample.useCases.map(
                                                    (useCase, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-start gap-2"
                                                        >
                                                            <Briefcase className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm">
                                                                {useCase}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="code">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold">
                                            Production Code
                                        </h3>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        selectedExample.code
                                                    )
                                                }
                                            >
                                                <Copy className="h-4 w-4 mr-1" />
                                                Copy
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    sendToPlayground(
                                                        selectedExample.code
                                                    )
                                                }
                                            >
                                                <Play className="h-4 w-4 mr-1" />
                                                Playground
                                            </Button>
                                        </div>
                                    </div>
                                    <CodeBlock
                                        code={selectedExample.code}
                                        language="python"
                                        filename={`${selectedExample.id}.py`}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="setup">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">
                                            Dependencies
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {selectedExample.dependencies.map(
                                                (dep) => (
                                                    <Badge
                                                        key={dep}
                                                        variant="outline"
                                                    >
                                                        <Code className="h-3 w-3 mr-1" />
                                                        {dep}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">
                                            Setup Instructions
                                        </h3>
                                        <CodeBlock
                                            code={
                                                selectedExample.setupInstructions
                                            }
                                            language="bash"
                                            filename="setup.sh"
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="deployment">
                                <div className="space-y-6">
                                    {selectedExample.deploymentNotes && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">
                                                Deployment Notes
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {
                                                    selectedExample.deploymentNotes
                                                }
                                            </p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {selectedExample.scalingConsiderations && (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                                    <TrendingUp className="h-5 w-5 mr-2" />
                                                    Scaling Considerations
                                                </h3>
                                                <ul className="space-y-2">
                                                    {selectedExample.scalingConsiderations.map(
                                                        (
                                                            consideration,
                                                            idx
                                                        ) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                                                <span className="text-sm">
                                                                    {
                                                                        consideration
                                                                    }
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        {selectedExample.securityNotes && (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                                    <Shield className="h-5 w-5 mr-2" />
                                                    Security Notes
                                                </h3>
                                                <ul className="space-y-2">
                                                    {selectedExample.securityNotes.map(
                                                        (note, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <Shield className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                                <span className="text-sm">
                                                                    {note}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            {selectedExample.performanceMetrics && (
                                <TabsContent value="metrics">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            Performance Metrics
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <Card>
                                                <CardContent className="p-4 text-center">
                                                    <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                                                    <h4 className="font-semibold">
                                                        Response Time
                                                    </h4>
                                                    <p className="text-2xl font-bold text-green-600">
                                                        {
                                                            selectedExample
                                                                .performanceMetrics
                                                                .responseTime
                                                        }
                                                    </p>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardContent className="p-4 text-center">
                                                    <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                                    <h4 className="font-semibold">
                                                        Throughput
                                                    </h4>
                                                    <p className="text-2xl font-bold text-blue-600">
                                                        {
                                                            selectedExample
                                                                .performanceMetrics
                                                                .throughput
                                                        }
                                                    </p>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardContent className="p-4 text-center">
                                                    <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                                                    <h4 className="font-semibold">
                                                        Cost Estimate
                                                    </h4>
                                                    <p className="text-2xl font-bold text-purple-600">
                                                        {
                                                            selectedExample
                                                                .performanceMetrics
                                                                .costEstimate
                                                        }
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </TabsContent>
                            )}
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">
                    Real-World Examples Collection
                </h1>
                <p className="text-muted-foreground">
                    Production-ready templates and industry-specific agent
                    implementations for immediate deployment
                </p>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search examples, industries, or technologies..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isSelected =
                                    selectedCategory === category.id;

                                return (
                                    <Button
                                        key={category.id}
                                        variant={
                                            isSelected ? "default" : "outline"
                                        }
                                        size="sm"
                                        onClick={() =>
                                            setSelectedCategory(category.id)
                                        }
                                        className="flex items-center gap-1"
                                    >
                                        <Icon className="h-4 w-4" />
                                        {category.name}
                                    </Button>
                                );
                            })}
                        </div>

                        {/* Industry Filter */}
                        <select
                            value={selectedIndustry}
                            onChange={(e) =>
                                setSelectedIndustry(e.target.value)
                            }
                            className="px-3 py-2 border rounded-md"
                        >
                            {industries.map((industry) => (
                                <option key={industry.id} value={industry.id}>
                                    {industry.name}
                                </option>
                            ))}
                        </select>

                        {/* Difficulty Filter */}
                        <select
                            value={selectedDifficulty}
                            onChange={(e) =>
                                setSelectedDifficulty(e.target.value)
                            }
                            className="px-3 py-2 border rounded-md"
                        >
                            {difficulties.map((diff) => (
                                <option key={diff} value={diff}>
                                    {diff === "all"
                                        ? "All Levels"
                                        : diff.charAt(0).toUpperCase() +
                                          diff.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
                Showing {filteredExamples.length} of {examples.length} examples
            </div>

            {/* Examples Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExamples.map((example) => {
                    const Icon = getCategoryIcon(example.category);
                    const IndustryIcon = example.industry
                        ? getIndustryIcon(example.industry)
                        : Building;

                    return (
                        <Card
                            key={example.id}
                            className="cursor-pointer hover:shadow-lg transition-all"
                            onClick={() => setSelectedExample(example)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-2">
                                        <div
                                            className={`p-2 rounded-lg ${getCategoryColor(
                                                example.category
                                            )}`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        {example.industry && (
                                            <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                                                <IndustryIcon className="h-4 w-4" />
                                            </div>
                                        )}
                                    </div>
                                    <Badge
                                        className={getDifficultyColor(
                                            example.difficulty
                                        )}
                                    >
                                        {example.difficulty}
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg">
                                    {example.title}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {example.description}
                                </p>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-1">
                                        {example.tags.slice(0, 3).map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                        {example.tags.length > 3 && (
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                +{example.tags.length - 3}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {example.performanceMetrics && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    <Zap className="h-3 w-3 mr-1" />
                                                    Production Ready
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    downloadExample(example);
                                                }}
                                            >
                                                <Download className="h-3 w-3" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {filteredExamples.length === 0 && (
                <div className="text-center py-12">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                        No examples found
                    </h3>
                    <p className="text-muted-foreground">
                        Try adjusting your search or filter criteria
                    </p>
                </div>
            )}
        </div>
    );
}
