"""Debugging commands."""

import discord
from discord.ext import commands

from amy.lib import logging

logger = logging.getLogger(__name__)
logger.debug(f"{__name__} initialization started")


class GameCommands(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        logger.debug(f"{__name__} Cog initialized")

    @commands.command(name="setbalance", help="Set your game balance (admin only)")
    @commands.is_owner()
    async def set_balance(self, ctx: commands.Context, amount: int):
        # TODO
        await ctx.reply(f"Game balance set to {amount} coins.")
    
    @commands.command(name="changebalance", help="Change your game balance (admin only)")
    @commands.is_owner()
    async def change_balance(self, ctx: commands.Context, amount: int):
        # TODO
        await ctx.reply(f"Game balance changed by {amount} coins.")

    @discord.app_commands.command(name="balance", description="Check your game balance")
    async def balance(self, interaction: discord.Interaction):
        # TODO
        balance = 1000
        await interaction.response.send_message(
            f"Your game balance is: {balance} coins", ephemeral=True
        )

    @discord.app_commands.command(name="daily", description="Claim your daily reward")
    async def daily(self, interaction: discord.Interaction):
        # TODO
        reward = 100
        await interaction.response.send_message(
            f"You have claimed your daily reward of {reward} coins!", ephemeral=True
        )
