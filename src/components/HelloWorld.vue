<script setup lang="ts">
import Item from '@/components/Item.vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import CardContent from './ui/card/CardContent.vue'
</script>

<template>
  <Card>
    <CardContent>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger><Item /></AccordionTrigger>
          <AccordionContent>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ndf3fTN0ZL0?si=qtHjX_qWK35zllET"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen></iframe>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>
</template>
