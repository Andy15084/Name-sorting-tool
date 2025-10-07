import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all contacts
export async function GET(request: NextRequest) {
  try {
    // Get userId from query params (passed from client)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }
    
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
    const body = await request.json();
    const { userId, ...contactData } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        userId,
        name: contactData.name,
        dateOfBirth: contactData.dateOfBirth,
        whenWeMet: contactData.whenWeMet,
        school: contactData.school,
        professionText: contactData.professionText,
        professions: contactData.professions || [],
        contacts: contactData.contacts || [],
        socialMedia: contactData.socialMedia || [],
        comments: contactData.comments || [],
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}

