import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all contacts
export async function GET(request: NextRequest) {
  try {
    const userId = 'andrej-paulicka'; // Simple user ID based on your login
    
    const contacts = await prisma.contact.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

// POST new contact
export async function POST(request: NextRequest) {
  try {
    const userId = 'andrej-paulicka';
    const body = await request.json();

    const contact = await prisma.contact.create({
      data: {
        userId,
        name: body.name,
        dateOfBirth: body.dateOfBirth,
        whenWeMet: body.whenWeMet,
        school: body.school,
        professionText: body.professionText,
        professions: body.professions || [],
        contacts: body.contacts || [],
        socialMedia: body.socialMedia || [],
        comments: body.comments || [],
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}

