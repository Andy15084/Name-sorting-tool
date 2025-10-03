import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT update contact
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const contact = await prisma.contact.update({
      where: { id },
      data: {
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
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

// DELETE contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}

